import React from 'react'
import style from './goToLine.module.sass'

export default function GoToLine() {
  return (
    <a href='line://' className={style.goToLineWrap}>
      <img src='assets/goToLine.svg' alt='Go to Line' className={style.goToLine} />
    </a>
  )
}
