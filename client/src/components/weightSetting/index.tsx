import React from 'react'
import Background from '@common/background'
import InfoCard from '@common/infoCard'
import NextButton from '@common/nextButton'
import style from './weightSetting.module.sass'
import { routePath } from '../../appConfig'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function() {
  const intl = useIntl()

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
        <img src='./'></img>
        <span>{intl.formatMessage(messages.reminder)}</span>
      </div>
      <div className={style.button}>
        <NextButton path={routePath.measurement}></NextButton>
      </div>
    </Background>
  )
}
