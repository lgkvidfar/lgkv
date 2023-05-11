import clsx from 'clsx'
import { HTMLAttributes, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IGsapProps } from 'src/types/IGsapProps'
gsap.registerPlugin(ScrollTrigger)

export const ZoomScroll = ({
  container,
  scrub = 1,
  snapto = 1,
  duration = 0.01,
  fromscale = 1,
  toscale = 1.05,
  fromvars,
  tovars,
  ...props
}: IGsapProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!container.current) return
      if (!ref.current) return
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
            markers: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          ref.current,
          {
            scale: fromscale,
            ...fromvars,
          },
          {
            scale: toscale,
            ease: 'none',
            ...tovars,
          },
        )
    })
    return () => ctx.revert() // <-- CLEANUP!
  }, [])
  return (
    <div {...props} className={clsx('', props.className)}>
      <div ref={ref}>{props.children}</div>
    </div>
  )
}

export default ZoomScroll
