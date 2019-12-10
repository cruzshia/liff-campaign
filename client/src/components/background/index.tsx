import React, { PropsWithChildren } from 'react'
import style from './background.module.sass'

interface Props {
  backgroundColor?: 'beige' | 'darkGreen' | 'lightGreen'
}

const BG_COLOR = {
  beige: '',
  darkGreen: 'darkGreenBg',
  lightGreen: 'lightGreenBg'
}

export default function Background({ backgroundColor = 'beige', children }: PropsWithChildren<Props>) {
  return (
    <div className={`d-flex align-center flex-column ${style.background} ${style[BG_COLOR[backgroundColor]]}`}>
      {children}
    </div>
  )
}
