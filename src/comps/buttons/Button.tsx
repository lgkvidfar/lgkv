import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = (props: Props) => {
  return (
    <button {...props} className={clsx('px-[1rem] py-[0.5rem] rounded', props.className)}>
      {props.children}
    </button>
  )
}

export default Button
