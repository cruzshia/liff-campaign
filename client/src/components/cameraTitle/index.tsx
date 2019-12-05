import React from 'react'
import style from './cameraTitleBanner.module.sass'

export default function({ children }: React.PropsWithChildren<{}>) {
  return <div className={style.title}>{children}</div>
}
