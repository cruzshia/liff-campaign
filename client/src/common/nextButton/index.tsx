import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import style from './button.module.sass'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function({ path }: { path: string }) {
  const intl = useIntl()
  const history = useHistory()
  const handleRedirect = useCallback(() => history.push(path), [path])
  return (
    <button onClick={handleRedirect} className={style.button}>
      {intl.formatMessage(messages.next)}
    </button>
  )
}
