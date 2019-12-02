import React from 'react'
import Background from '@common/background'
import InfoCard from '@src/common/infoCard'
import style from './infoSetting.module.sass'

export default function infoSetting() {
  return (
    <Background>
      <InfoCard title='性別' message='あなたの身長を教えてください'>
        <label>
          <input type='radio' />
          男性
        </label>
        <label>
          <input type='radio' />
          女性
        </label>
      </InfoCard>
      <InfoCard title='生年月日' message='あなたの身長を教えてください'>
        <select className={style.select}>
          <option>168cm</option>
        </select>
      </InfoCard>
      <InfoCard title='身長' message='あなたの身長を教えてください'>
        <select className={style.select}>
          <option>168cm</option>
        </select>
      </InfoCard>
    </Background>
  )
}
