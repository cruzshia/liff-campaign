import React from 'react'
import style from './selectMenu.module.sass'
export interface OptionType {
  title: string
  value: any
}
interface Props {
  unit: string
  name: string
  onChange?: (ev: any) => void
  min: number
  max: number
  padTo?: number
}

const optionGenerator = ({ min, max, padTo }: { min: number; max: number; padTo: number }) => {
  const arr = []
  for (let i = min; i <= max; i++) {
    const val = padTo ? i.toString().padStart(padTo, '0') : i
    arr.push(
      <option key={val} value={val}>
        {val}
      </option>
    )
  }

  return arr
}

export default function SelectMenu({ unit, name, onChange, min, max, padTo = 0 }: Props) {
  return (
    <label className='flex-center-center' htmlFor={name}>
      <div className='d-flex x-pr'>
        <div className={style.select_border} />
        <select className={style.select} name={name} id={name} onChange={onChange}>
          {optionGenerator({ min, max, padTo: padTo || 0 })}
        </select>
        <span className={style.arrow}></span>
      </div>
      {unit && <span className={style.unit}>{unit}</span>}
    </label>
  )
}
