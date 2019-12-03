import React from 'react'
import style from './button.module.sass'

export default function({
  children,
  onClick
}: React.PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button onClick={onClick} className={style.button}>
      {children}
    </button>
  )
}
