import clsx from 'clsx'
import { HTMLAttributes, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export interface Props extends HTMLAttributes<HTMLDivElement> {
  //   children: React.ReactNode
  containerRef: React.RefObject<HTMLDivElement>
  childArray: React.ReactNode[]
  scrub?: number | boolean
  toVars?: gsap.TweenVars
  start?: string
  snapTo?: number
  duration?: number
}

export const HorizScroll = ({
  containerRef,
  scrub = 1,
  snapTo = 1,
  duration = 0.01,
  toVars,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!containerRef.current) return
      if (!ref.current) return
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            scrub,
            markers: true,
            invalidateOnRefresh: true,
            snap: {
              snapTo,
              duration,
              ease: 'power2.inOut',
            },
          },
        })
        .to(ref.current, {
          ...toVars,
          x: -containerRef.current?.clientWidth,
          ease: 'none',
        })
    })
    return () => ctx.revert() // <-- CLEANUP!
  }, [])
  return (
    <div ref={ref} {...props} className={clsx('flex w-full h-screen', props.className)}>
      {props.childArray}
    </div>
  )
}

export default HorizScroll
