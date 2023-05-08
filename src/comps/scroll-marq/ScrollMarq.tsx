import clsx from 'clsx'
import { HTMLAttributes, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  containerRef: React.RefObject<HTMLDivElement>
  dir?: 'left' | 'right'
  scrub?: number | boolean
  percentage?: number
  width?: number
}

export const ScrollMarq = ({
  containerRef,
  dir = 'left',
  scrub = 1,
  percentage,
  width = 200,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!ref.current) return
      // const mobile = window.matchMedia('(max-width: 768px)').matches
      // MarqueeSection Text
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            scrub,
            start: 'top top',
            endTrigger: percentage ? '' : ref.current,
            end: percentage ? `+=${percentage}%` : '',
            markers: true,
          },
        })
        .fromTo(
          ref.current,
          {
            x: dir === 'right' ? -ref.current?.clientWidth / 2 : 0,
          },
          {
            x: dir === 'right' ? 0 : -ref.current?.clientWidth / 2,
            ease: 'none',
          },
        )
    })
    return () => ctx.revert() // <-- CLEANUP!
  }, [])
  return (
    <div {...props} ref={containerRef} className={clsx('overflow-hidden', props.className)}>
      <div
        ref={ref}
        className={`flex gap-[1rem] justify-around flex-nowrap whitespace-nowrap w-[200%] `}
      >
        {props.children}
      </div>
    </div>
  )
}

export default ScrollMarq
