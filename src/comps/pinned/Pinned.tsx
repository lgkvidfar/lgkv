import clsx from 'clsx'
import { HTMLAttributes, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  endTrigger?: React.RefObject<HTMLDivElement>
  percentage?: number
  scrub?: number | boolean
  toVars?: gsap.TweenVars
  limitSelf?: boolean
}

export const Pinned = ({ endTrigger, percentage = 100, scrub = true, toVars, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            scrub,
            pin: true,
            pinSpacing: false,
            markers: true,
            invalidateOnRefresh: true,
            end: endTrigger ? '' : props.limitSelf ? `+=${percentage}% top` : `+=${percentage}%`,
            endTrigger: endTrigger?.current,
          },
        })
        .to(ref.current, {
          ...toVars,
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

export default Pinned
