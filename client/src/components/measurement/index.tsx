import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import style from './measurement.module.sass'
import { routePath } from '@src/appConfig'

export default function() {
  const history = useHistory()
  const handleUseCamera = useCallback(() => history.push(routePath.root), [history])
  const handleUseInput = useCallback(() => history.push(routePath.root), [history])
  return (
    <Background>
      <InfoCard title='体重' message='あなたの体重をチェックしてください'>
        <div className={style.border}></div>
        <div>
          <img src='/' alt='1'></img>
        </div>
      </InfoCard>
      <div>
        <span> スマホのカメラでチェックができるよ！服を着たままでOK！</span>
        <img src='/' alt='2'></img>
      </div>
      <div>
        <Button onClick={handleUseCamera}>写真でチェックする</Button>
        <Button onClick={handleUseInput}>手動でチェックする</Button>
      </div>
    </Background>
  )
}