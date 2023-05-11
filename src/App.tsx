import { useRef } from 'react'
import { Follow, Pinned } from './comps'

function App() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <main className="h-[400vh] bg-dark">
      <div className="h-screen w-full bg-orange-200 "></div>
      <div
        ref={ref}
        className="h-screen w-full flex justify-center items-end overflow-hidden relative"
      >
        <Follow dir="up" toy={'-100%'} className="py-[2rem]" container={ref} markers="true">
          <div className="h-[30vh] w-[20vw] bg-green-200/60 flex items-end">hello</div>
        </Follow>
      </div>
      <div className="h-screen w-full bg-blue-200 "></div>
    </main>
  )
}

export default App
