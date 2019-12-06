import React from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import { useIntl } from 'react-intl'
import messages from './messages'
import PageTitle from '@components/pageTitle'
import DashBorder from '@src/components/dashBorder'
import { routePath } from '@src/appConfig'
import GoToLine from '@src/components/goToLine'

export default function MeasurementMain() {
  const {formatMessage} = useIntl()
  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{formatMessage(messages.title)}</PageTitle>
      <Background>
        <InfoCard
          title={formatMessage(messages.title)}
          message={formatMessage(messages.message)}
          titleImg='/assets/waistSize.svg'
        >
          <DashBorder />
          <div className='flex-center-center p-1rem'>
            <img src='/assets/measurementIntro.svg' alt='' className='image' />
          </div>
        </InfoCard>
        <div>
          <span className='pre-wrap'>{formatMessage(messages.reminder)}</span>
          <img src='/' alt='' />
        </div>

        <Button path={routePath.userTerms}>{formatMessage(messages.useCamera)}</Button>
        <Button path={routePath.waistSizeInput}>{formatMessage(messages.useInput)}</Button>
        <GoToLine />
      </Background>
    </div>
  )
}
