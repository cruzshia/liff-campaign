import React from 'react'
import Background from '@common/background'
import InfoCard from '@common/infoCard'
import Button from '@common/button'
import style from './measurement.module.sass'

export default function() {
  return (
    <Background>
      <InfoCard title='体重' message='あなたの体重をチェックしてください'>
        <div className={style.border}></div>
        <div>
          <img src='/'></img>
        </div>
      </InfoCard>
      <div>
        <span> スマホのカメラでチェックができるよ！服を着たままでOK！</span>
        <img src='/'></img>
      </div>
      <div>
        <Button>写真でチェックする</Button>
        <Button>手動でチェックする</Button>
      </div>
    </Background>
  )
}
