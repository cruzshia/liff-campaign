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
        <label>
          <input type='radio'></input>
          {formatMessage(messages.attend)}
        </label>

        <label>
          <input type='radio'></input>
          {formatMessage(messages.dontAttend)}
        </label>
      </div>
      <p className={`mt-1rem ${style.font_orange}`}>aaaaaaaaaaaaaaaaaaaaa</p>
    </div>
  )
}
