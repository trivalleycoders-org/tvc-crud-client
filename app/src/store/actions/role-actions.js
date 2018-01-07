import { log } from '../../lib/ke-utils'
import { createRequestThunk, logReturnValue } from './action-utils'
import api from '../../api'

export const replaceRoles = (roles) => {
  log('actions.replaceRoles', '', 'yellow')
 // log('actions.replaceMembers: roles', roles, 'orange')
 return({
   type: 'app/replaceRoles',
   payload: roles,
 })
}

export const requestReadRoles = createRequestThunk({
  request: api.roles.read,
  key: 'api/getReadRoles',
  success: [ replaceRoles,  (value) => logReturnValue(value) ],
})
