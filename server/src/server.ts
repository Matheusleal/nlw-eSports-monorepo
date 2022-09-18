import express from "express"
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { ConvertHourStringToMinutes, ConvertMinutesToHourString } from "./utils/conversors"

const app = express()
const prisma = new PrismaClient({
  log: ['query', 'error']
})

app.use(express.json())
app.use(cors())

//games
app.get('/games', async (req, res) => {

  const games = await prisma.game.findMany(
    {
      include: {
        _count: {
          select: {
            ads: true
          }
        }
      }
    }
  )

  return res.json(games)
})

app.get('/games/:id/ads', async (req, res) => {
  const id = req.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      HourStart: true,
      hourend: true
    },
    where: {
      gameId: id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formated = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      HourStart: ConvertMinutesToHourString(ad.HourStart),
      hourend: ConvertMinutesToHourString(ad.hourend)
    }
  })

  return res.json(formated)
})

app.post('/games/:id/ads', async (req, res) => {

  const id: any = req.params.id
  const body: any = req.body

  const ad = await prisma.ad.create({
    data: {
      gameId: id,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      HourStart: ConvertHourStringToMinutes(body.hourStart),
      hourend: ConvertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  const formated = {
    ...ad,
    weekDays: ad.weekDays.split(','),
    HourStart: ConvertMinutesToHourString(ad.HourStart),
    hourend: ConvertMinutesToHourString(ad.hourend)
  }

  return res.status(201).json(formated)
})

//ads

app.get('/ads/:id/discord', async (req, res) => {

  const id = req.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: id
    }
  })

  return res.json({
    discord: ad.discord
  })
})

app.listen(3333);