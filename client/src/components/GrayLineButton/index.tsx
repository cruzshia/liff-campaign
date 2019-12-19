import React from 'react'
import style from '../button/button.module.sass'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function GrayLineButton() {
  const { formatMessage } = useIntl()
  return (
    <a href='line://' className={style.gray}>
      {formatMessage(messages.notToday)}
    </a>
  )
}
