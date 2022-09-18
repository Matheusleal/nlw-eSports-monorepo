import { useEffect, useState } from 'react'

import { CreateGameBanner} from './components/CreateGameBanner'

import logoImg from './assets/logo-nlw-esports.svg'
import { NewAnnouncementDialog } from './components/NewAnnouncementDialog'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}


function App() {

  const [games, setGames] = useState<Game[]>([])


  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center m-20'>
      <img src={logoImg} />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'>duo</span> está aqui.
      </h1>


      <div className=' grid grid-cols-6 gap-6 mt-16'>

        {games && games.map(game =>
          <CreateGameBanner
            key={game.id}
            title={game.title}
            addsCount={game._count.ads}
            bannerUrl={game.bannerUrl} />
        )}

      </div>

      <NewAnnouncementDialog />

    </div>
  )
}

export default App
