import React, { useContext } from 'react'
import Top from './top'
import Middle from './middle'
import Background from '@components/background'
import messages from '../messages'
import { useIntl } from 'react-intl'
import Button from '@components/button'
import { InfoSettingContext } from '../index'

export default function() {
  const intl = useIntl()
  const { handleProceed } = useContext(InfoSettingContext)
  return (
    <>
      <Top />
      <Middle />
      <Background>
        <Button onClick={handleProceed}>
          {intl.formatMessage(messages.input)}
        </Button>
        <Button>{intl.formatMessage(messages.noInput)}</Button>
      </Background>
    </>
  )
}
