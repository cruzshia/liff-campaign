import React from 'react'
import style from './cameraTitleBanner.module.sass'

export default function CameraTitleBanner() {
  return (
    <h1 className={`flex-center-center ${style.title}`}>
      <div className={`flex-center-center ${style.wrap}`}>
        <img src='assets/bodygram.svg' alt='bodygram' className={style.bodygram} />
      </div>
    </h1>
  )
}
