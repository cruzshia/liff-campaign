import React from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import style from '../measurement.module.sass'
import { useIntl } from 'react-intl'
import messages from '../messages'
import PageTitle from '@components/pageTitle'
import DashBorder from '@src/components/dashBorder'
import { routePath } from '@src/appConfig'

export default function MeasurementMain() {
  const intl = useIntl()
  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{intl.formatMessage(messages.title)}</PageTitle>
      <Background>
        <InfoCard
          title={intl.formatMessage(messages.title)}
          message={intl.formatMessage(messages.message)}
        >
          <DashBorder />
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
          <Button path={routePath.userTerms}>
            {intl.formatMessage(messages.useCamera)}
          </Button>
          <Button path={routePath.waistSizeInput}>
            {intl.formatMessage(messages.useInput)}
          </Button>
        </div>
      </Background>
    </div>
  )
}
