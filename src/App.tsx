import { useRef } from 'react'
import { ScrollMarq } from './comps/scroll-marq'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <main className="h-[300vh] w-full bg-dark relative">
      <div ref={containerRef} className="h-screen w-full bg-orange-200 relative">
        <ScrollMarq
          containerRef={containerRef}
          dir="left"
          width={50}
          className="absolute bottom-[0%] left-0 w-full"
        >
          <p className="bg-red-300 ml-[1rem] ">First WELCOME TO MY PORTFOLIO </p>
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>{' '}
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>{' '}
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-red-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-red-300 mr-[1rem]">WELCOME TO MY PORTFOLIO Last</p>
        </ScrollMarq>
        <ScrollMarq
          containerRef={containerRef}
          dir="right"
          className="absolute bottom-[30%] left-0 w-full -rotate-12"
        >
          <p className="bg-green-200   ml-[1rem] ">First WELCOME TO MY PORTFOLIO </p>
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>{' '}
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>{' '}
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-green-300 ">WELCOME TO MY PORTFOLIO</p>
          <p className="bg-green-400  mr-[1rem]">WELCOME TO MY PORTFOLIO Last</p>
        </ScrollMarq>
      </div>

      <div className="h-screen w-full bg-pink-200 "></div>
    </main>
  )
}

export default App
