import React from 'react'
import style from './pageTitle.module.sass'
import LineButton from '@components/LineButton'

export default function({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <LineButton />
      <h1 className={`d-block ${style.pageTitle}`}>{children}</h1>
    </>
  )
}
