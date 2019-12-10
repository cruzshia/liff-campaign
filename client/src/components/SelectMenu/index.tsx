import React from 'react'
import style from './selectMenu.module.sass'

export interface OptionType {
  title: string
  value: any
}
interface Props {
  unit: string
  name: string
}

export default function SelectMenu({ children, unit, name }: React.PropsWithChildren<Props>) {
  return (
    <label className='flex-center-center' htmlFor={name}>
      <div className='d-flex x-pr'>
        <div className={style.select_border} />
        <select className={style.select} name={name} id={name}>
          {children}
        </select>
        <span className={style.arrow}></span>
      </div>
      {unit && <span className={style.unit}>{unit}</span>}
    </label>
  )
}
