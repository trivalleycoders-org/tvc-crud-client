import { combineReducers } from 'redux'
import { merge, prepend, dissoc } from 'ramda'
import * as ku from '../lib/ke-utils'

export const membersById = ( state = {}, { type, payload }) => {

  try {
    switch (type) {
      case 'app/updateMemberFormFields':
      case 'app/updateMember':
        return merge(state, { [payload.id]: payload })
      case 'app/insertMember': // new/add & update
        return merge(state, { [payload._id]: payload })
      case 'app/replaceMembers': // read list load all
        ku.log("reducers.membersById: payload", payload)
        return payload.members
      case 'app/removeMember':
        return dissoc(payload.member_id, state)
      default:
        return state
    }
  } catch (e) {
    ku.log('reducers.membersById', e, 'red')
  }
}

export const membersIds = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceMembers':
      ku.log('membersIds.payload', payload, 'orange')
      return payload.ids
    case 'app/insertMember':
      return prepend(payload._id, state)
    case 'app/removeMember':
      return dissoc(payload._id, state)
    default:
      return state
  }
}

export const openMemberId = (state = null, { type, payload }) => {
// *** Maybe name this openMemberId *** see DRE reducer openNoteId ** DO IT!
// SEE OPEN gedit NOTE
  switch (type) {

    case 'app/openMember':
      ku.log('reducers.editMemberId: type', type, 'orange')
      ku.log('reducers.editMemberId: payload', payload, 'orange')
      return payload.id
    case 'app/closeMember':
      return null
    default:
      return state
  }
}

export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case 'app/markRequestPending':
      return merge(state, { [meta.key]: { status: 'pending', error: null } })
    case 'app/markRequestSuccess':
      return merge(state, { [meta.key]: { status: 'success', error: null } })
    case 'app/markRequestFailed':
      return merge(state, { [meta.key]: { status: 'failure', error: payload } })
    default:
      return state
  }
}

export default combineReducers({
  members: combineReducers({
    membersById,
    membersIds,
  }),
  openMemberId,
  requests,
})
