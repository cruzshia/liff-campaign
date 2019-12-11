import React from 'react'
import style from '../register.module.sass'
import { useIntl } from 'react-intl'
import messages from '../messages'

export default function() {
  const { formatMessage } = useIntl()
  return (
    <div className={`flex-center-center flex-column mt-1rem mb-1rem ${style.image_padding}`}>
      <img src='/assets/activityIntro.svg' alt='' className='w-100 image' />
      <div className='mt-1rem'>
        <label htmlFor='attend'>
          <input type='radio' name='isEntryContest' value='true' id='attend'></input>
          {formatMessage(messages.attend)}
        </label>
        <label htmlFor='dontAttend'>
          <input type='radio' name='isEntryContest' value='false' defaultChecked id='dontAttend'></input>
          {formatMessage(messages.dontAttend)}
        </label>
      </div>
      <p className={`mt-1rem pre-wrap ${style.font_orange}`}>{formatMessage(messages.reminder)}</p>
    </div>
  )
}
