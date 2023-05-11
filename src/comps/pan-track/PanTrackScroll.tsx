import clsx from 'clsx'
import { HTMLAttributes, ReactNode, useEffect, useRef, Children } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { IGsapProps } from 'src/types/IGsapProps'

interface IPanTrackScrollProps extends IGsapProps {
  animatepan?: boolean
  animatescale?: boolean
  panpercentage?: number
  percentage?: number
}

export const PanTrackScroll = ({
  container,
  fromvars,
  tovars,
  children,
  percentage = 100,
  animatepan = false,
  panpercentage = 100,
  animatescale = false,
  fromscale = 1,
  toscale = 1,

  ...props
}: IPanTrackScrollProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!container.current) return
      if (!ref.current) return

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'bottom bottom',
            end: 'top top',
            scrub: 1,
            markers: true,
            invalidateOnRefresh: true,
          },
        })
        .to(ref.current, {
          x: -container.current.clientWidth * (percentage / 100),
          ease: 'none',
          ...tovars,
        })

      if (animatepan || animatescale) {
        const childImages = gsap.utils.toArray(ref.current.querySelectorAll('img'))
        childImages.forEach((child: any, i) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 70%',
                end: 'bottom 20%',
                scrub: 1,
                markers: true,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              child,
              { scale: fromscale, ...fromvars },
              {
                objectPosition: `${panpercentage}% center`,
                scale: toscale,
                ...tovars,
              },
            )
        })
      }
    })
    return () => ctx.revert() // <-- CLEANUP!
  }, [])

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
}

export default PanTrackScroll
