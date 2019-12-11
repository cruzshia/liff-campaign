import React, { useContext } from 'react'
import Top from './components/top'
import Middle from './components/middle'
import Background from '@components/background'
import messages from './messages'
import { useIntl } from 'react-intl'
import Button from '@components/button'
import { InfoSettingContext } from './index'
import PageTitle from '@components/pageTitle'
import LineButton from '@src/components/LineButton'

export default function InfoSetting() {
  const { formatMessage } = useIntl()
  const { handleProceed } = useContext(InfoSettingContext)
  return (
    <>
      <PageTitle>{formatMessage(messages.pageTitle)}</PageTitle>
      <form onSubmit={handleProceed}>
        <Top />
        <Middle />
        <Background>
          <Button submit={true}>{formatMessage(messages.input)}</Button>
          <Button>{formatMessage(messages.noInput)}</Button>
          <LineButton />
        </Background>
      </form>
    </>
  )
}
