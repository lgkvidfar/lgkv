import clsx from 'clsx'
import { HTMLAttributes, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  containerRef: React.RefObject<HTMLDivElement>
  percentage?: number
  pixels?: number
  scrub?: number | boolean
  toVars?: gsap.TweenVars
  limitSelf?: boolean
  start?: string
  dir?: 'up' | 'down'
  speed?: number
}

export const Follow = ({
  containerRef,
  scrub = 1,
  start = 'top center',
  dir = 'down',
  speed = 1,
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
            endTrigger: containerRef.current,
            start,
            scrub,
            markers: true,
            invalidateOnRefresh: true,
          },
        })
        .to(ref.current, {
          ...toVars,
          y:
            dir === 'down'
              ? containerRef.current?.clientHeight * speed - ref.current?.clientHeight
              : -containerRef.current?.clientHeight * speed + ref.current?.clientHeight,
          ease: 'none',
        })
    })
    return () => ctx.revert() // <-- CLEANUP!
  }, [])
  return (
    <div ref={ref} {...props} className={clsx('', props.className)}>
      {props.children}
    </div>
  )
}

export default Follow
