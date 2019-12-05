import React from 'react'
import style from './button.module.sass'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import messages from './messages'

export default function({
  children,
  onClick,
  path = '',
  isOrange = false,
  isLightGreen = false
}: React.PropsWithChildren<{
  onClick?: () => void
  path?: string
  isOrange?: boolean
  isLightGreen?: boolean
}>) {
  const intl = useIntl()
  return onClick && !path ? (
    <div
      className={`${style.button_wrap} ${
        isOrange
          ? style.orange_button
          : isLightGreen
          ? style.light_green_button
          : ''
      }`}
    >
      <button onClick={onClick} className={style.button}>
        {children ? children : intl.formatMessage(messages.next)}
      </button>
    </div>
  ) : (
    <div
      className={`${style.button_wrap} ${
        isOrange
          ? style.orange_button
          : isLightGreen
          ? style.light_green_button
          : ''
      }`}
    >
      <Link to={path} className={style.button}>
        {children ? children : intl.formatMessage(messages.next)}
      </Link>
    </div>
  )
}
