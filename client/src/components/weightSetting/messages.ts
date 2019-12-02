import { defineMessages } from 'react-intl'

const PREFIX = 'weightSetting.'
export default defineMessages({
  weightTitle: {
    id: PREFIX + 'weightTitle',
    defaultMessage: 'Weight'
  },
  weightMessage: {
    id: PREFIX + 'weightMessage',
    defaultMessage: 'Please Input your weight'
  },
  weightHint: {
    id: PREFIX + 'hint',
    defaultMessage: 'Please choose the closest number'
  },
  kg: {
    id: PREFIX + 'kg',
    defaultMessage: 'kg'
  },
  reminder:{
    id: PREFIX + 'reminder',
    defaultMessage: 'some reminder'
  }
})
