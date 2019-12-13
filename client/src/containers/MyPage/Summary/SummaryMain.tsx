import React from 'react'
import { PROFILE_TAB, TAB_OTPNIOS } from '../utils'
import SwitchTab from '@components/SwitchTab'

const SummaryMain = () => {
  return (
    <div className='h-100vh d-flex flex-column'>
      <SwitchTab tabOptions={TAB_OTPNIOS} selectedID={PROFILE_TAB.SUMMARY} />
      summary
    </div>
  )
}
export default SummaryMain
