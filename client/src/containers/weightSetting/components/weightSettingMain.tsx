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
import GoToLine from '@src/components/goToLine'

export default function() {
  const {formatMessage} = useIntl()
  const history = useHistory()
  const handleRedirect = useCallback(() => history.push(routePath.measurement), [history])
  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{formatMessage(messages.weightTitle)}</PageTitle>
      <Background>
        <InfoCard
          title={formatMessage(messages.weightTitle)}
          message={formatMessage(messages.weightMessage)}
          titleImg='/assets/weight.svg'
        >
          <Select unit='kg' name='weight'>
            <option>50</option>
          </Select>

          <p>{formatMessage(messages.weightHint)}</p>
        </InfoCard>
        <div>
          <img src='/' alt='' />
          <span className='pre-wrap'>{formatMessage(messages.reminder)}</span>
        </div>
        <Button onClick={handleRedirect} />
        <GoToLine />
      </Background>
    </div>
  )
}
