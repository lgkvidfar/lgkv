import { HTMLAttributes, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IGsapProps } from 'src/types/IGsapProps'
gsap.registerPlugin(ScrollTrigger)

export const ScrollMarq = ({
  container,
  dir = 'left',
  scrub = 1,
  start = 'top bottom',
  percentage,
  ...props
}: IGsapProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!ref.current) return

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            scrub,
            start,
            endTrigger: percentage ? '' : container.current,
            end: percentage ? `+=${percentage}%` : 'bottom top',
            markers: true,
          },
        })
        .fromTo(
          ref.current,
          {
            x: dir === 'right' ? -ref.current?.clientWidth / 2 : 0,
            ...props.fromvars,
          },
          {
            x: dir === 'right' ? 0 : -ref.current?.clientWidth / 2,
            ...props.tovars,
          },
        )
    })
    return () => ctx.revert() // <-- CLEANUP!
  }, [])

  return (
    <div {...props} ref={container}>
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
