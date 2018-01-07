import { log } from '../../lib/ke-utils'
import { createRequestThunk, logReturnValue } from './action-utils'
import api from '../../api'

export const replaceSchedule = (schedule) => {
  log('actions.replaceSchedule', '', 'yellow')
 // log('actions.replaceSchedule: schedule', schedule, 'orange')
 return({
   type: 'app/replaceSchedule',
   payload: schedule,
 })
}

export const requestReadSchedule = createRequestThunk({
  request: api.schedule.read,
  key: 'api/getReadSchedule',
  success: [ replaceSchedule,  (value) => logReturnValue(value) ],
})
