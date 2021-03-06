import React from 'react'
import style from './button.module.sass'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function Button({
  children,
  onClick,
  path = '',
  color = 'green',
  submit
}: React.PropsWithChildren<{
  onClick?: () => void
  path?: string
  color?: 'green' | 'light_green' | 'orange' | 'gray'
  submit?: boolean
}>) {
  const { formatMessage } = useIntl()
  return (onClick && !path) || submit ? (
    <button onClick={onClick} className={style[color]} type={submit ? 'submit' : 'button'}>
      {children ? children : formatMessage(messages.next)}
    </button>
  ) : (
    <Link to={path} className={style[color]}>
      {children ? children : formatMessage(messages.next)}
    </Link>
  )
}
