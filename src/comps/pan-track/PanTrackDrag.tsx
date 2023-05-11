import { useEffect, useRef } from 'react'
import { IGsapProps } from 'src/types/IGsapProps'

interface IPanTrackDragProps extends IGsapProps {
  animatepan?: boolean
  animatescale?: boolean
  panpercentage?: number
  percentage?: number
}

export const PanTrackDrag = ({
  container,
  children,
  percentage = 100,
  animatepan = false,
  panpercentage = 100,
  animatescale = false,
  ...props
}: IPanTrackDragProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const mouseDownAt = useRef<number>(0)
  const currentPercentage = useRef<number>(0)
  const percentagePreMoved = useRef<number>(0)

  const calcPercentageToMove = (e: MouseEvent | TouchEvent) => {
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
    const maxDelta = window.innerWidth / 2
    const delta = clientX - mouseDownAt.current
    const percentageMoved = (delta / maxDelta) * 100
    const percentageToMove = Math.min(
      0,
      Math.max(-100, percentagePreMoved.current + percentageMoved),
    )
    return percentageToMove
  }

  const calcPercentageToMoveKeyboard = (e: KeyboardEvent) => {
    const maxDelta = window.innerWidth / 2
    const delta = e.key === 'ArrowRight' ? 10 : -10
    const percentageMoved = (delta / maxDelta) * 100
    const percentageToMove = Math.min(
      0,
      Math.max(-100, percentagePreMoved.current + percentageMoved),
    )

    return percentageToMove
  }

  const handleMouseDown = (e: MouseEvent) => {
    document.body.style.cursor = 'grabbing'
    mouseDownAt.current = e.clientX
  }

  const handleTouchDown = (e: TouchEvent) => {
    mouseDownAt.current = e.touches[0].clientX
  }

  const handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation()
    if (!ref.current) return
    if (!mouseDownAt.current) return

    const percentageToMove = (calcPercentageToMove(e) * percentage) / 100
    currentPercentage.current = percentageToMove

    ref.current.animate(
      {
        transform: `translate(${percentageToMove}%)`,
      },
      {
        duration: 1000,
        fill: 'both',
        easing: 'ease-in-out',
      },
    )

    if (!animatepan) return

    for (const image of ref.current.getElementsByTagName('img')) {
      image.animate(
        {
          objectPosition: `${panpercentage + percentageToMove}% center`,
        },
        { duration: 1000, fill: 'forwards' },
      )
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!ref.current) return
    if (!mouseDownAt.current) return

    // check for two figers
    if (e.touches.length < 1) return

    const percentageToMove = (calcPercentageToMove(e) * percentage) / 100
    currentPercentage.current = percentageToMove

    ref.current.animate(
      {
        transform: `translate(${percentageToMove}%)`,
      },
      {
        duration: 1000,
        fill: 'both',
        easing: 'ease-in-out',
      },
    )

    if (!animatepan) return

    for (const image of ref.current.getElementsByTagName('img')) {
      image.animate(
        {
          objectPosition: `${panpercentage + percentageToMove}% center`,
        },
        {
          duration: 1000,
          fill: 'forwards',
        },
      )
    }
  }

  const handleMouseUp = (e: MouseEvent) => {
    document.body.style.cursor = 'grab'
    if (!container.current) return
    percentagePreMoved.current = currentPercentage.current
    mouseDownAt.current = 0
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!container.current) return
    percentagePreMoved.current = currentPercentage.current
    mouseDownAt.current = 0
  }

  const handleMouseLeave = (e: MouseEvent) => {
    document.body.style.cursor = 'default'
    if (!container.current) return
    mouseDownAt.current = 0
  }

  const handleTouchCancel = (e: TouchEvent) => {
    if (!container.current) return
    mouseDownAt.current = 0
  }

  const handleMouseEnter = (e: MouseEvent) => {
    document.body.style.cursor = 'grab'
  }

  useEffect(() => {
    if (!ref.current) return
    if (!container.current) return
    container.current.onmousedown = handleMouseDown
    container.current.onmousemove = handleMouseMove
    container.current.onmouseup = handleMouseUp
    container.current.onmouseleave = handleMouseLeave
    container.current.onmouseenter = handleMouseEnter

    container.current.ontouchstart = handleTouchDown
    container.current.ontouchmove = handleTouchMove
    container.current.ontouchend = handleTouchEnd
    container.current.ontouchcancel = handleTouchCancel

    return () => {
      if (!container.current) return
      container.current.onmousedown = null
      container.current.onmousemove = null
      container.current.onmouseup = null
      container.current.onmouseleave = null
      container.current.onmouseenter = null

      container.current.ontouchstart = null
      container.current.ontouchmove = null
      container.current.ontouchend = null
      container.current.ontouchcancel = null
    }
  }, [])

  return (
    <div draggable={false} ref={ref} {...props}>
      {children}
    </div>
  )
}

export default PanTrackDrag
