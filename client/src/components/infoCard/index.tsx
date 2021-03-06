import React from 'react'
import style from './infoCard.module.sass'

interface Props {
  message?: string
  title?: string
  titleImg?: string
  hasCircle?: boolean
  scroll?: boolean
}

export default function({
  message,
  title,
  titleImg,
  children,
  hasCircle = true,
  scroll = false
}: React.PropsWithChildren<Props>) {
  return (
    <div className={`${style.background}${scroll ? ' ' + style.scroll : ''}`}>
      {message && (
        <div className='flex-center-center'>
          {hasCircle && (
            <div className={`flex-center-center ${style.circle}`}>
              <img alt={title} src={titleImg} className={style.circle_img} />
            </div>
          )}
          <p className={style.message}>{message}</p>
        </div>
      )}
      <div className={`flex-center-center flex-column${message ? ' ' + style.children : ''}`}>{children}</div>
    </div>
  )
}
