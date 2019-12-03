import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { useIntl } from 'react-intl'
import messages from './messages'
import Button from '@components/button'
import { routePath } from '@src/appConfig'
import Top from './components/top'
import Middle from './components/middle'
import Background from '@components/background'

export default function InfoSetting() {
  const intl = useIntl()
  let history = useHistory()

  const handlePageChange = useCallback(
    () => history.push(routePath.weightSetting),
    [history]
  )

  return (
    <>
      <Top />
      <Middle />
      <Background>
        <Button onClick={handlePageChange}>
          {intl.formatMessage(messages.input)}
        </Button>
        <Button onClick={() => {}}>
          {intl.formatMessage(messages.noInput)}
        </Button>
      </Background>
    </>
  )
}
