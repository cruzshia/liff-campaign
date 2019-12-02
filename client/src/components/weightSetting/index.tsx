import React from 'react'
import Background from '@common/background'
import InfoCard from '@common/infoCard'
import Button from '@common/button'
import style from './weightSetting.module.sass'

export default function() {
  return (
    <Background>
      <InfoCard title='体重' message='あなたの身長を教えてください'>
        <select>
          <option>50</option>
        </select>
        <p>aaaaaaaaa</p>
      </InfoCard>
      <div>
        <img src='./' alt='3'></img>
        <span>
          あなたの身長を教えてくださいあなたの身長を教えてくださいあなたの身長を教えてください
        </span>
      </div>
      <div className={style.button}>
        <Button>次へ</Button>
      </div>
    </Background>
  )
}
