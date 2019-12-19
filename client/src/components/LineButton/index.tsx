import React from 'react'
import style from './lineButton.module.sass'

export default function LineButton() {
  return (
    <div className='flex-center-center x-pr'>
      <a href='line://' className={style.goToLineWrap}>
        <img src='assets/goToLine.svg' alt='Go to Line' className='h-100' />
      </a>
      <div className={style.mainTitleWrap}>
        <img src='assets/mainTitle.svg' alt='' className='h-100' />
      </div>
    </div>
  )
}
