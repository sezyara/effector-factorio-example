import type { CSSProperties, EventHandler, MouseEvent, ReactNode } from 'react'
import cn from 'clsx'
import classes from './style.module.css'

export interface ButtonProps {
  className?: string
  children?: ReactNode
  danger?: boolean
  ghost?: boolean
  onClick?: EventHandler<MouseEvent<HTMLButtonElement>>
  style?: CSSProperties
}

export const Button = ({
  className,
  children,
  danger = false,
  ghost = false,
  ...props
}: ButtonProps) => {
  const classNames = cn(classes.btn, {
    [classes.danger]: !!danger,
    [classes.ghost]: !!ghost
  }, className)

  return (
    <button
      className={classNames}
      {...props}
    >
      {children}
    </button>
  )
}
