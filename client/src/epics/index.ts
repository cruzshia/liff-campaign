import UserEpics from './user/userEpics'
import BodygramEpics from './bodygram/bodygramEpics'
import { combineEpics } from 'redux-observable'

export default combineEpics(...UserEpics, ...BodygramEpics)
