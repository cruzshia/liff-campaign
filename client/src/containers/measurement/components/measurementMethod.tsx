import React from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import style from '../measurement.module.sass'
import { useIntl } from 'react-intl'
import messages from '../messages'

interface Props {
  handleUseInput: () => void
  handleUseCamera: () => void
}

export default function({ handleUseInput, handleUseCamera }: Props) {
  const intl = useIntl()
  return (
    <Background>
      <InfoCard
        title={intl.formatMessage(messages.title)}
        message={intl.formatMessage(messages.message)}
      >
        <div className={style.border}></div>
        <div>
          <img src='/' alt='' />
        </div>
      </InfoCard>
      <div>
        <span className='pre-wrap'>
          {intl.formatMessage(messages.reminder)}
        </span>
        <img src='/' alt='' />
      </div>
      <div>
        <Button onClick={handleUseCamera}>
          {intl.formatMessage(messages.useCamera)}
        </Button>
        <Button onClick={handleUseInput}>
          {intl.formatMessage(messages.useInput)}
        </Button>
      </div>
    </Background>
  )
}
