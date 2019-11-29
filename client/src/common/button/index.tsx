import React from 'react'
import style from './button.module.sass'

export default function(props:{children:React.ReactNode}) {
  return <button className={style.button}>{props.children}</button>
}
