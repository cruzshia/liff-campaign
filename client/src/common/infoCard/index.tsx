import React from 'react'
import style from './singleSelector.module.sass'

interface Props {
  message: string
  title: string
}

export default function(props: React.PropsWithChildren<Props>) {
  return (
    <div className={style.background}>
      <div className={style.dFlex}>
        <div className={style.circle}>{props.title}</div>
        <p>{props.message}</p>
      </div>
      <div>{props.children}</div>
    </div>
  )
}
