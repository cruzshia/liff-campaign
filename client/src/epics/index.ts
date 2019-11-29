import UserEpics from './user/userEpics'
import { combineEpics } from 'redux-observable'

export default combineEpics(...UserEpics)
