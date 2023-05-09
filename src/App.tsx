import { useMemo, useRef } from 'react'
import { HorizScroll } from './comps/horiz-scroll'

function App() {
  const ref = useRef<HTMLDivElement>(null)

  const horizScroll = useMemo(() => {
    return [
      <div className="w-full h-screen flex-shrink-0 bg-red-200">Hello One </div>,
      <div className="w-full h-screen flex-shrink-0 bg-red-400">Hello Two</div>,
    ]
  }, [])
  return (
    <main className="h-[400vh] w-full bg-dark relative">
      <div className="h-screen w-full bg-orange-200 relative flex justify-center items-center  ">
        <p>Hello World One</p>
      </div>
      <div ref={ref} className="h-[200vh] w-full overflow-hidden bg-gray-500 ">
        <HorizScroll containerRef={ref} childArray={horizScroll} />
      </div>

      <div className="h-screen w-full bg-green-200 relative flex justify-center items-center  ">
        <p>Hello World Three</p>
      </div>
      <div className="h-screen w-full bg-blue-200 relative flex justify-center items-center  ">
        <p>Hello World Three</p>
      </div>
    </main>
  )
}

export default App
