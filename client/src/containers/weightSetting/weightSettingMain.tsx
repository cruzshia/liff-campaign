import React, { useState, useCallback } from 'react'
import Background from '@components/background'
import InfoCard from '@components/infoCard'
import Button from '@components/button'
import { useIntl } from 'react-intl'
import messages from './messages'
import Select from '@src/components/SelectMenu'
import PageTitle from '@components/pageTitle'
import GrayLineButton from '@src/components/GrayLineButton'

const MIN_WEIGHT = 30

export default function({ handleProceed }: { handleProceed: (weight: number) => void }) {
  const { formatMessage } = useIntl()
  const [weight, setWeight] = useState(MIN_WEIGHT)
  const handleOnChange = useCallback(
    (ev: React.FormEvent<HTMLSelectElement>) => {
      setWeight(Number(ev.currentTarget.value))
    },
    [setWeight]
  )

  const handleClick = useCallback(() => {
    handleProceed(weight)
  }, [weight, handleProceed])

  return (
    <div className='h-100vh d-flex flex-column'>
      <PageTitle>{formatMessage(messages.weightTitle)}</PageTitle>
      <Background>
        <InfoCard
          title={formatMessage(messages.weightTitle)}
          message={formatMessage(messages.weightMessage)}
          titleImg='/assets/weight.svg'
        >
          <Select unit='kg' name='weight' onChange={handleOnChange} min={MIN_WEIGHT} max={200} />
          <p className='fs-8 fw-300 mt-1rem'>{formatMessage(messages.weightHint)}</p>
        </InfoCard>
        <img className='image' src='/assets/weightReminder.svg' alt=''></img>
        <Button onClick={handleClick} />
        <GrayLineButton/>
      </Background>
    </div>
  )
}
