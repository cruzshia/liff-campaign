import React from 'react'
import style from './button.module.sass'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function({
  children,
  onClick,
  path = '',
  color = 'green'
}: React.PropsWithChildren<{
  onClick?: () => void
  path?: string
  color?: 'green' | 'light_green' | 'orange'
}>) {
  const { formatMessage } = useIntl()
  return onClick && !path ? (
    <button onClick={onClick} className={style[color]}>
      {children ? children : formatMessage(messages.next)}
    </button>
  ) : (
    <Link to={path} className={style[color]}>
      {children ? children : formatMessage(messages.next)}
    </Link>
  )
}
