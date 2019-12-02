import React from 'react'
import style from './button.module.sass'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function({ onClick }: { onClick: () => void }) {
  const intl = useIntl()
  return (
    <button onClick={onClick} className={style.button}>
      {intl.formatMessage(messages.next)}
    </button>
  )
}
