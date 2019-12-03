import React from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import style from '../infoSetting.module.sass'
import { useIntl } from 'react-intl'
import messages from '../messages'

export default function() {
  const intl = useIntl()
  return (
    <Background>
      <InfoCard
        title={intl.formatMessage(messages.genderTitle)}
        message={intl.formatMessage(messages.genderMessage)}
      >
        <label>
          <input type='radio' />
          {intl.formatMessage(messages.male)}
        </label>
        <label>
          <input type='radio' />
          {intl.formatMessage(messages.female)}
        </label>
      </InfoCard>
      <InfoCard
        title={intl.formatMessage(messages.birthdayTitle)}
        message={intl.formatMessage(messages.birthdayMessage)}
      >
        <label>
          {intl.formatMessage(messages.year)}
          <select className={style.select}>
            <option>168cm </option>
          </select>
        </label>
        <label>
          {intl.formatMessage(messages.month)}
          <select className={style.select}>
            <option>168cm </option>
          </select>
        </label>
        <label>
          {intl.formatMessage(messages.day)}
          <select className={style.select}>
            <option>168cm </option>
          </select>
        </label>
      </InfoCard>
      <InfoCard
        title={intl.formatMessage(messages.heightTitle)}
        message={intl.formatMessage(messages.heightMessage)}
      >
        <select className={style.select}>
          <option>168cm</option>
        </select>
      </InfoCard>
    </Background>
  )
}
