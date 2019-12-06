import React from 'react'
import Background from '@src/components/background'
import messages from '../messages'
import { useIntl } from 'react-intl'
import Button from '@components/button'
import CameraTitleBanner from '@src/components/cameraTitleBanner'
import style from '../cameraTutorial.module.sass'

interface Props {
  handleReturn: () => void
  handleProceed: () => void
}

export default function({ handleReturn, handleProceed }: Props) {
  const { formatMessage } = useIntl()
  return (
    <div className='h-100vh d-flex flex-column'>
      <CameraTitleBanner />
      <Background>
        <div className='flex-center-center flex-column'>
          <img src='/assets/cameraTutorial2.svg' alt='' className={`mt-1rem mb-1rem ${style.image}`} />
          <span className='mb-1rem'>
            <input type='checkbox' />
            <span className={style.light_green_font}>{formatMessage(messages.checkbox)}</span>
          </span>
          <Button onClick={handleProceed} />
          <Button onClick={handleReturn} />
        </div>
      </Background>
    </div>
  )
}
