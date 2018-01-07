import { log } from '../../lib/ke-utils'
import api from '../../api'
import { createRequestThunk, logReturnValue, logError } from './action-utils'


export const replaceMembers = (members) => {
  // ku.log('replaceMembers: members', members, 'orange')
  log('actions.replaceMembers', '', 'yellow')
  return({
    type: 'app/replaceMembers',
    payload: members,
  })
}

export const openMember = (id) => {
  // log('actions.openmemberId: id', id, 'orange')
  log('actions.openMember', '', 'yellow')
  return ({
    type: 'app/openMember',
    payload:  { id } ,
  })
}

export const createMember = (member) => {
  // log('actions.createMember: member.id', member.id, 'orange')
  // log('actions.createMember: member', member, 'orange')
  log('actions.createMember', '', 'yellow')
  return ({
    type: 'app/createMember',
    payload: member,
  })
}

export const closeMember = (result) => {
  log('actions.closeMember', result, 'yellow')
  return ({
    type: 'app/closeMember',
  })
}

export const updateMemberLocal = (id, field, value) => {
  // log('actions.updateMemberLocal: member_id', member_id, 'orange')
  // log('actions.updateMemberLocal: member', member, 'orange')
  log('actions.updateMemberLocal', '', 'yellow')
  return ({
    type: 'app/updateMemberLocal',
    payload: {
      id,
      field,
      value,
    }
  })
}

export const deleteMember = (member_id) => {
  log('actions.deleteMember', '', 'yellow')
  // ku.log('actions.deleteMember: member_id', member_id, 'orange')
  return ({
    type: 'app/deleteMember',
    payload: { member_id },
  })
}

export const requestReadMembers = createRequestThunk({
  request: api.members.read,
  key: 'api/getReadMembers',
  success: [ replaceMembers,  (value) => logReturnValue(value)],
})

// const testAction = () => {
//   log('error', '', 'red')
// }
export const requestUpdateMember = createRequestThunk({
  request: api.members.update,
  key: (member_id) => `api/updateMember/${member_id}`,
  success: [ closeMember,  (value) => logReturnValue(value) ],
  failure: [ (value) => logReturnValue(value)]
  // failure: [ (err) => logError(err) ],
  // failure: [ testAction ]
})

// Retnruns a member with id property only
export const requestCreateMember = createRequestThunk({
  request: api.members.create,
  key: 'api/createMember',
  success: [ createMember, (member) => openMember(member.id), requestReadMembers,  (value) => logReturnValue(value) ],
  failure: [ (err) => logError(err) ],
})

export const requestDeleteMember = createRequestThunk({
  request: api.members.delete,
  key: (member_id) => `api/deleteMember/${member_id}`,
  success: [ (member_id) => deleteMember(member_id) ,  (value) => logReturnValue(value) ],
})
