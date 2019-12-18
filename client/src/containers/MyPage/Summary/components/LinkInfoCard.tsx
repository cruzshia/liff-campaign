import React from 'react'
import { useIntl } from 'react-intl'
import messages from '../messages'
import style from '../profileSummary.module.sass'

export default function LinkInfoCard() {
  const formatMessage = useIntl().formatMessage
  return (
    <div className={`${style.link_card} flex-center-center flex-column`}>
      <img src='assets/myPage/myPageOrganReminder.svg' alt='' className='image'></img>
      <a href='/' className={`mb-1rem image ${style.link}`}>
        {formatMessage(messages.infoLink)}
      </a>
      <img src='assets/myPage/myPageOrgenReminder2.svg' alt='' className='image'></img>
    </div>
  )
}
