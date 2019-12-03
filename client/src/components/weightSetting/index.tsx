import React, { useCallback } from 'react'
import Background from '@common/background'
import InfoCard from '@common/infoCard'
import NextButton from '@common/nextButton'
import style from './weightSetting.module.sass'
import { routePath } from '@src/appConfig'
import { useIntl } from 'react-intl'
import messages from './messages'
import { useHistory } from 'react-router-dom'

export default function() {
  const intl = useIntl()
  const history = useHistory()
  const handleRedirect = useCallback(
    () => history.push(routePath.measurement),
    [history]
  )

  return (
    <Background>
      <InfoCard
        title={intl.formatMessage(messages.weightTitle)}
        message={intl.formatMessage(messages.weightMessage)}
      >
        <label>
          <select>
            <option>50</option>
          </select>
          {intl.formatMessage(messages.kg)}
        </label>

        <p>{intl.formatMessage(messages.weightHint)}</p>
      </InfoCard>
      <div>
        <img src='./' alt='4'></img>
        <span>{intl.formatMessage(messages.reminder)}</span>
      </div>
      <div className={style.button}>
        <NextButton onClick={handleRedirect}></NextButton>
      </div>
    </Background>
  )
}
