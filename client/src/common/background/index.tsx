import React from 'react'
import style from './background.module.sass'

export default function(props: React.PropsWithChildren<{}>) {
  return <div className={style.background}>{props.children}</div>
}
