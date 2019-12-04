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
      <div className='flex-center-center'>
        <div className={`flex-center-center ${style.circle}`}>
          <img alt={title} src='/' />
        </div>
        <p className={style.message}>{message}</p>
      </div>
      <div className={style.children}>{children}</div>
    </div>
  )
}
