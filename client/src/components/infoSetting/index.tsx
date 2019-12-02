import React, { useMemo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Background from '@common/background'
import InfoCard from '@src/common/infoCard'
import style from './infoSetting.module.sass'
import { useIntl } from 'react-intl'
import messages from './messages'
import Button from '@common/button'
import { routePath } from '../../appConfig'

export default function InfoSetting() {
  const intl = useIntl()
  let history = useHistory()

  const handlePageChange = useCallback(
    () => history.push(routePath.weightSetting),
    [history]
  )

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
      <Button onClick={handlePageChange}>
        {intl.formatMessage(messages.input)}
      </Button>
      <Button onClick={() => {}}>
        {intl.formatMessage(messages.noInput)}
      </Button>
    </Background>
  )
}
