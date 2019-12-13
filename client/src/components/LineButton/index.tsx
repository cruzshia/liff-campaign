import React from 'react'
import style from './lineButton.module.sass'

export default function LineButton() {
  return (
    <a href='line://' className={style.goToLineWrap}>
      <img src='assets/myPage/goToLine.svg' alt='Go to Line' className={style.goToLine} />
    </a>
  )
}
