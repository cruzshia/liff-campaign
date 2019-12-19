import React from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import { useIntl } from 'react-intl'
import messages from './messages'
import PageTitle from '@components/pageTitle'
import DashBorder from '@src/components/dashBorder'
import { routePath } from '@src/appConfig'

export default function MeasurementMain() {
  const { formatMessage } = useIntl()
  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{formatMessage(messages.title)}</PageTitle>
      <Background>
        <img src='assets/measurement.svg' alt='' className='w-100' />
        <Button path={routePath.termOfUse}>{formatMessage(messages.useCamera)}</Button>
        <img src='assets/measurement2.svg' alt='' className='w-100' />
        <Button path={routePath.waistSizeInput}>{formatMessage(messages.useInput)}</Button>
      </Background>
    </div>
  )
}
