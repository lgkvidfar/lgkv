import { HTMLAttributes, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IGsapProps } from 'src/types/IGsapProps'
gsap.registerPlugin(ScrollTrigger)

export const Pinned = ({
  container,
  percentage = 100,
  start = 'top top',
  tovars,
  ...props
}: IGsapProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!container.current) return
      if (!ref.current) return

      const containerHeight = container.current.clientHeight
      const containerTop = container.current.offsetTop
      const containerBottom = containerTop + containerHeight

      const refHeight = ref.current.clientHeight
      const refTop = ref.current.offsetTop
      const refBottom = refTop + refHeight

      const pxTilBottom = containerBottom - refBottom - containerHeight

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start,
            pin: true,
            pinSpacing: false,
            end: props.land === 'true' ? `${pxTilBottom}` : `${percentage}%`,
            markers: props.markers === 'true' ? true : false,
            invalidateOnRefresh: true,
          },
        })
        .to(ref.current, {
          ...tovars,
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

export default Pinned
