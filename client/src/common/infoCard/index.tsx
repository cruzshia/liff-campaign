import React from 'react'
import style from './infoCard.module.sass'

interface Props {
  message: string
  title: string
}

export default function({
  message,
  title,
  children
}: React.PropsWithChildren<Props>) {
  return (
    <div className={style.background}>
      <div className='d-flex'>
        <div className={style.circle}>{title}</div>
        <p>{message}</p>
      </div>
      <div>{children}</div>
    </div>
  )
}
