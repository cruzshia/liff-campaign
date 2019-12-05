import React from 'react'
import style from './list.module.sass'

export default function({
  children,
  noStyle = false,
  isBold = false,
  isLarge = false
}: React.PropsWithChildren<{
  noStyle?: boolean
  isBold?: boolean
  isLarge?: boolean
}>) {
  return (
    <ul
      className={`${style.list}${noStyle ? ' ' + style.no_style : ''} ${
        isBold ? style.bold : ''
      } ${isLarge ? style.large : ''}`}
    >
      {children}
    </ul>
  )
}
