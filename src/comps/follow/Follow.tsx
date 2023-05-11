import { HTMLAttributes, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IGsapProps } from 'src/types/IGsapProps'
gsap.registerPlugin(ScrollTrigger)

export const Follow = ({
  container,
  scrub = 1,
  start = 'top center',
  end,
  dir = 'down',
  tovars,
  percentage,
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

      const pxTilTop = containerTop - refTop - refHeight
      const pxTilTopWeird = refTop - containerTop - refHeight

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start,
            end,
            scrub,
            markers: props.markers === 'true' ? true : false,
            invalidateOnRefresh: true,
          },
        })
        .to(ref.current, {
          ...tovars,
          y:
            dir === 'down'
              ? props.land === 'true'
                ? pxTilBottom
                : props.toy
              : props.land === 'true'
              ? pxTilTop !== 0
                ? -pxTilTop
                : pxTilTopWeird
              : props.toy,
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

export default Follow
