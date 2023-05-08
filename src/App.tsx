import { useState } from 'react'
import { Button } from './comps'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="h-screen w-full bg-dark">
      <Button className="bg-light">Me Button</Button>
    </main>
  )
}

export default App
