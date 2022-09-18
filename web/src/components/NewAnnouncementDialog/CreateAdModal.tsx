import { Check, GameController } from 'phosphor-react'
import axios from 'axios'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
// import * as Select from '@radix-ui/react-select'

import { Input } from '../Form/Input'
import { FormEvent, useEffect, useState } from 'react'


interface Game {
  id: string
  title: string
}


export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);


  useEffect(() => {
    axios("http://localhost:3333/games")
      .then(response => setGames(response.data))
  }, [])


  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    const data = Object.fromEntries(formData)

    // to-do: criar validações

    try {

      const obj = {
        "name": data.name,
        "yearsPlaying": Number(data.yearsPlaying),
        "discord": data.discord,
        "weekDays": weekDays.map(Number),
        "hourStart": data.hourStart,
        "hourEnd": data.hourEnd,
        "useVoiceChannel": useVoiceChannel
      }

      await axios.post(`http://localhost:3333/games/${data.game}/ads`, obj)

      alert("anúncio criado com sucesso!")
    } catch (error) {

      console.error(error)

      alert("Erro ao criar o anúncio!")
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content
        className='fixed bg-[#2A2634] text-white 
          py-8 px-10 
          top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          rounded-lg
          w-[480px]
          shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl text-white font-black'>Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>

          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold' >Qual o Game?</label>
            {/* to-do: Impement using Radix UI select */}
            <select
              id="game"
              name="game"
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
              defaultValue="">
              <option value="" disabled>Selecione o game que deseja jogar</option>
              {
                games.map(game =>
                  <option key={game.id} value={game.id}>{game.title}</option>
                )
              }
            </select>

          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="name">Nome (ou nickname)</label>
            <Input id="name" name="name" type="text" placeholder='Informe seu nome ou nickname' />
          </div>

          <div className='grid grid-cols-2 gap-6 appearance-none'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Jogas há quantos anos?</label>
              <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" name="discord" type="text" placeholder='usuário#0000' />
            </div>
          </div>

          <div className='flex gap-6'>

            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando custuma jogar?</label>
              <ToggleGroup.Root
                id='weekDays'
                type='multiple'
                className='grid grid-cols-5 gap-1'
                value={weekDays}
                onValueChange={setWeekDays}>

                <ToggleGroupItem value='0' title="Domingo" content='D' />
                <ToggleGroupItem value='1' title="Segunda" content='S' />
                <ToggleGroupItem value='2' title="Terça" content='T' />
                <ToggleGroupItem value='3' title="Quarta" content='Q' />
                <ToggleGroupItem value='4' title="Quinta" content='Q' />
                <ToggleGroupItem value='5' title="Sexta" content='S' />
                <ToggleGroupItem value='6' title="Sábado" content='S' />

              </ToggleGroup.Root>
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual o horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input id="hourStart" name="hourStart" type="time" placeholder='De' />
                <Input id="hourEnd" name="hourEnd" type="time" placeholder='Até' />
              </div>
            </div>

          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root
              id="useVoice"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) setUseVoiceChannel(true)
                else setUseVoiceChannel(false)
              }}
              className='w-6 h-6 p-1 rounded bg-zinc-900'>
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Custumo conectar no chat de voz?
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
              type='button'>
              Cancelar
            </Dialog.Close>

            <button
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
              type="submit">
              <GameController size={24} />
              Encontrar duo
            </button>

          </footer>

        </form>

      </Dialog.Content>
    </Dialog.Portal>
  )


  interface ToggleGroupItemProps {
    title: string
    value: string
    content: string
  }

  function ToggleGroupItem({ title, value, content }: ToggleGroupItemProps) {
    return (
      <ToggleGroup.Item
        title={title}
        value={value}
        className={`w-8 h-8 rounded ${weekDays.includes(value) ? 'bg-violet-500' : 'bg-zinc-900'}`}>
        {content}
      </ToggleGroup.Item>
    )
  }
}
