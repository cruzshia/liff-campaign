import React from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import { useIntl } from 'react-intl'
import messages from '../messages'
import SelectMenu from '@src/components/SelectMenu'

export default function() {
  const intl = useIntl()
  return (
    <Background>
      <InfoCard
        title={intl.formatMessage(messages.genderTitle)}
        message={intl.formatMessage(messages.genderMessage)}
        titleImg='assets/gender.svg'
      >
        <div className='d-flex justify-center'>
          <label>
            <input type='radio' />
            {intl.formatMessage(messages.male)}
          </label>
          <label>
            <input type='radio' />
            {intl.formatMessage(messages.female)}
          </label>
        </div>
      </InfoCard>
      <InfoCard
        title={intl.formatMessage(messages.birthdayTitle)}
        message={intl.formatMessage(messages.birthdayMessage)}
        titleImg='assets/birthday.svg'
      >
        <div className='d-flex justify-between w-100'>
          <div>
            {intl.formatMessage(messages.year)}
            <SelectMenu name='year' unit=''>
              <option>168cm </option>
            </SelectMenu>
          </div>
          <div>
            {intl.formatMessage(messages.month)}
            <SelectMenu name='month' unit=''>
              <option>168cm </option>
            </SelectMenu>
          </div>
          <div>
            {intl.formatMessage(messages.day)}
            <SelectMenu name='day' unit=''>
              <option>168cm </option>
            </SelectMenu>
          </div>
        </div>
      </InfoCard>
      <InfoCard
        title={intl.formatMessage(messages.heightTitle)}
        message={intl.formatMessage(messages.heightMessage)}
        titleImg='assets/height.svg'
      >
        <SelectMenu unit='cm' name='height'>
          <option>168cm</option>
        </SelectMenu>
      </InfoCard>
    </Background>
  )
}
