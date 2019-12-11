import React, { useState, useCallback } from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import Select from '@src/components/SelectMenu'
import messages from './messages'
import { useIntl } from 'react-intl'
import PageTitle from '@components/pageTitle'
import LineButton from '@src/components/LineButton'

const MIN_WAIST_SIZE = 50

export default function({ handleProceed }: { handleProceed: (waistCircumference: number) => void }) {
  const { formatMessage } = useIntl()
  const [waistSize, setWaistSize] = useState(MIN_WAIST_SIZE)
  const handleOnChange = useCallback(
    (ev: React.FormEvent<HTMLSelectElement>) => {
      setWaistSize(Number(ev.currentTarget.value))
    },
    [setWaistSize]
  )
  const handleClick = useCallback(() => handleProceed(waistSize), [waistSize, handleProceed])

  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{formatMessage(messages.title)}</PageTitle>
      <Background>
        <InfoCard
          title={formatMessage(messages.title)}
          message={formatMessage(messages.message)}
          titleImg='/assets/waistSize.svg'
        >
          <Select unit='cm' name='inputWaistSize' onChange={handleOnChange} min={MIN_WAIST_SIZE} max={300} />
          <p className='fs-8'>{formatMessage(messages.hint)}</p>
        </InfoCard>
        <img className='image' src='/assets/waistSizeReminder.svg' alt=''></img>
        <Button onClick={handleClick} />
        <LineButton />
      </Background>
    </div>
  )
}
