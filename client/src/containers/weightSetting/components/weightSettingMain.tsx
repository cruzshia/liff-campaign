import React, { useCallback } from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import { routePath } from '@src/appConfig'
import { useIntl } from 'react-intl'
import messages from '../messages'
import { useHistory } from 'react-router-dom'
import Select from '@components/select'
import PageTitle from '@components/pageTitle'

export default function() {
  const intl = useIntl()
  const history = useHistory()
  const handleRedirect = useCallback(
    () => history.push(routePath.measurement),
    [history]
  )
  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{intl.formatMessage(messages.weightTitle)}</PageTitle>
      <Background>
        <InfoCard
          title={intl.formatMessage(messages.weightTitle)}
          message={intl.formatMessage(messages.weightMessage)}
        >
          <Select unit='kg' name='weight'>
            <option>50</option>
          </Select>

          <p>{intl.formatMessage(messages.weightHint)}</p>
        </InfoCard>
        <div>
          <img src='/' alt='' />
          <span className='pre-wrap'>
            {intl.formatMessage(messages.reminder)}
          </span>
        </div>
        <div>
          <Button onClick={handleRedirect} />
        </div>
      </Background>
    </div>
  )
}
