import React from 'react'
import style from './singleSelector.module.sass'

export default function() {
  return (
    <div className={style.background}>
      <div className={style.dFlex}>
        <div className={style.circle}>身長</div>
        <p>
          あなたの身長を
          <br />
          教えてください
        </p>
      </div>
      <div>
        <select className={style.select}>
          <option>168cm</option>
        </select>
      </div>
    </div>
  )
}
