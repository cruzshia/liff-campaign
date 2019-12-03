import React from 'react'
import style from './button.module.sass'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function({
  children,
  onClick,
  path = ''
}: React.PropsWithChildren<{ onClick?: () => void; path?: string }>) {
  const intl = useIntl()
  return onClick && !path ? (
    <button onClick={onClick} className={style.button}>
      {children ? children : intl.formatMessage(messages.next)}
    </button>
  ) : (
    <Link to={path} className={style.button}>
      {children ? children : intl.formatMessage(messages.next)}
    </Link>
  )
}
