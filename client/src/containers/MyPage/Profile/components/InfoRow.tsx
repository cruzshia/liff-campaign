import React from 'react'
import style from '../profile.module.sass'

interface Props {
  labelName: string
  value: string
  last?: boolean
}

export default function InfoRow({ labelName, value, last }: Props) {
  return (
    <div className={`d-flex w-100 align-center ${style.infoRow} ${last ? style.last : ''}`}>
      <div className={style.label}>{labelName}</div>
      <div className={style.infoVal}>{value}</div>
    </div>
  )
}
