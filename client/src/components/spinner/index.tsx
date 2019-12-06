import React from 'react'
import style from './spinner.module.sass'

export default function() {
  return (
    <div className={`flex-center-center ${style.spinnerCtr}`}>
      <h1 className={style.logoTitle}>bodygram</h1>
      <h4 className={style.startText}>Starting....</h4>
      <div className={style.copyRight}>Copyright© Bodygram, Inc</div>
    </div>
  )
}
