import React from 'react'
import style from './background.module.sass'

export default function({ isGreen = false, children }: React.PropsWithChildren<{ isGreen?: boolean }>) {
  return (
    <div
      className={`d-flex align-center flex-column ${style.background}${isGreen ? ' ' + style.green_background : ''}`}
    >
      {children}
    </div>
  )
}
