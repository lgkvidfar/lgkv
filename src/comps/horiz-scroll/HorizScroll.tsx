import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IGsapProps } from 'src/types/IGsapProps'
import { EasePack } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)

export const HorizScroll = ({
  container,
  scrub = 1,
  duration = 0.01,
  tovars,
  ...props
}: IGsapProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!container.current) return
      if (!ref.current) return
      const current = container.current
      const childArr = gsap.utils.toArray(ref.current.children)
      const tl = gsap.to(childArr, {
        xPercent: -100 * (childArr.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          pin: true,
          scrub,
          snap: {
            snapTo: 1 / (childArr.length - 1),
          },
          end: () => '+=' + current.offsetWidth,
        },
      })
    })
    return () => ctx.revert() // <-- CLEANUP!
  }, [])

  return (
    <div ref={ref} {...props}>
      {props.children}
    </div>
  )
}

export default HorizScroll
