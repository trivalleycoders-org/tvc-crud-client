import api from '../../api'
import { log } from '../lib/ke-utils'
import { createRequestThunk, logReturnValue } from './action-utils'

export const replaceExclusions = (exclusions) => {
 // ku.log('actions.replaceMembers: exclusions', exclusions, 'orange')
 log('actions.replaceExclusions', '', 'yellow')
 return({
   type: 'app/replaceExclusions',
   payload: exclusions,
 })
}



export const requestReadExclusions = createRequestThunk({
  request: api.schedule.exclusions,
  key: 'api/getReadExclusions',
  success: [ replaceExclusions,  (value) => logReturnValue(value) ],
})
