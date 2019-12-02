import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Background from '@common/background'
import InfoCard from '@common/infoCard'
import Button from '@common/button'
import style from './measurement.module.sass'
import { routePath } from '../../appConfig'

export default function() {
  const history = useHistory()
  const handleUseCamera = useCallback(() => history.push(routePath.root), [])
  const handleUseInput = useCallback(() => history.push(routePath.root), [])
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
        <Button onClick={handleUseCamera}>写真でチェックする</Button>
        <Button onClick={handleUseInput}>手動でチェックする</Button>
      </div>
    </Background>
  )
}
