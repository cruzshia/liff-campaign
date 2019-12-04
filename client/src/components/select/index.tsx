import React from 'react'
import style from './select.module.sass'

export default function({
  children,
  unit,
  name
}: React.PropsWithChildren<{ unit: string; name: string }>) {
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
