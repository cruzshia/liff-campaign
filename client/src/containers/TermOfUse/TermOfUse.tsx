import React from 'react'
import Background from '@components/background'
import messages from './messages'
import { useIntl } from 'react-intl'
import InfoCard from '@components/infoCard'
import DashBorder from '@components/dashBorder'
import style from './termOfUse.module.sass'
import Button from '@components/button'
import { routePath } from '@src/appConfig'
import LineButton from '@components/LineButton'

export default function UserTermsMain() {
  const { formatMessage } = useIntl()
  return (
    <div className='h-100vh d-flex flex-column'>
      <LineButton />
      <Background backgroundColor='darkGreen'>
        <div className='flex-center-center flex-column'>
          <p className={style.font_white}>{formatMessage(messages.title)}</p>
          <img src='assets/bodygram.svg' alt='bodygram' className={style.bodygram} />
        </div>
        <InfoCard hasCircle={false} scroll={true}>
          <p>{formatMessage(messages.useTermsTitle)}</p>
          <DashBorder />
          <p className='pre-wrap'>{formatMessage(messages.description)}</p>
        </InfoCard>
        <Button path={routePath.cameraTutorial} color='light_green'>
          {formatMessage(messages.agree)}
        </Button>
        <Button color='gray' path={routePath.measurement}>{formatMessage(messages.disagree)}</Button>
      </Background>
    </div>
  )
}
