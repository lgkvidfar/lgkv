import { HTMLAttributes, MutableRefObject } from 'react'

export interface IGsapProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  container: React.RefObject<HTMLDivElement>
  markers?: "true" | "false"

  percentage?: number
  pixels?: number

  scrub?: number | boolean

  fromvars?: gsap.TweenVars
  tovars?: gsap.TweenVars

  snapto?: number
  duration?: number
  fromscale?: number
  toscale?: number

  limitself?: "true" | "false"


  toy?: number | string

  start?: string
  end?: string
  endtrigger?: MutableRefObject<HTMLElement | null>
  land?: "true" | "false"
  dir?: 'up' | 'down' | 'left' | 'right'

  speed?: number
}
