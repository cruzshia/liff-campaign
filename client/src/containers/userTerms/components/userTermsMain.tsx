import React from 'react'
import Background from '@src/components/background'
import messages from '../messages'
import { useIntl } from 'react-intl'
import InfoCard from '@components/infoCard'
import DashBorder from '@components/dashBorder'
import style from '../userTerms.module.sass'
import Button from '@components/button'
import { routePath } from '@src/appConfig'
import CameraTitleBanner from '@src/components/cameraTitleBanner'

export default function UserTermsMain() {
  const {formatMessage} = useIntl()
  return (
    <div className='h-100vh d-flex flex-column'>
      <Background isGreen={true}>
        <p className={style.font_white}>{formatMessage(messages.title)}</p>
        <div className={style.user_term_title}>
          <CameraTitleBanner />
        </div>
        <InfoCard hasCircle={false} scroll={true}>
          <p>{formatMessage(messages.useTermsTitle)}</p>
          <DashBorder />
          <p className='pre-wrap'>{formatMessage(messages.description)}</p>
        </InfoCard>
        <Button path={routePath.cameraTutorial} color='light_green'>
          {formatMessage(messages.agree)}
        </Button>
        <Button>{formatMessage(messages.disagree)}</Button>
      </Background>
    </div>
  )
}
