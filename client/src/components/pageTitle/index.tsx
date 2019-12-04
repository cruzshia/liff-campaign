import React from 'react'
import style from './pageTitle.module.sass'

export default function({ children }: React.PropsWithChildren<{}>) {
  return <div className={style.pageTitle}>{children}</div>
}
