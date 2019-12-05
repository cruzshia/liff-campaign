import { defineMessages } from 'react-intl'

const PREFIX = 'measurement.'

export default defineMessages({
  title: {
    id: PREFIX + 'title',
    defaultMessage: 'Waist Size'
  },
  message: {
    id: PREFIX + 'message',
    defaultMessage: 'Please check your waist size'
  },
  reminder: {
    id: PREFIX + 'reminder',
    defaultMessage: 'Please check your waist size'
  },
  useCamera: {
    id: PREFIX + 'useCamera',
    defaultMessage: 'Check using camera'
  },
  useInput: {
    id: PREFIX + 'useInput',
    defaultMessage: 'Check manually'
  },
})
