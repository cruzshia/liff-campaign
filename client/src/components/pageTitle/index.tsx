import React from 'react'
import style from './pageTitle.module.sass'

export default function({ children }: React.PropsWithChildren<{}>) {
  return <h1 className={`d-block ${style.pageTitle}`}>{children}</h1>
}
