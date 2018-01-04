import { combineReducers } from 'redux'
import { merge, dissoc, mergeDeepRight } from 'ramda' // prepend, , without
import { log } from '../lib/ke-utils'

export const membersById = ( state = {}, { type, payload }) => {
  switch (type) {
    case 'app/createMember': // new/add & update
      return merge(state, { [payload.id]: payload })
    case 'app/deleteMember':
      return dissoc(payload.id, state)
    case 'app/replaceMembers':
      return payload.membersById
    case 'app/updateMemberLocal':
      return mergeDeepRight(state, { [payload.id]: { [payload.field]: payload.value }})
    case 'app/updateMember':
      // falls through to default. Member is already in state so no need to make a change state
    default:
      return state
  }
}

export const memberIdsByAlpha = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceMembers':
      return payload.idsByAlpha
    default:
      return state
  }
}

export const memberIdsByLastRoleDate = (state = [], {type, payload}) => {
  switch (type) {
    case 'app/replaceMembers':
      return payload.idsByLastRoleDate
    default:
      return state
  }
}

export const openMemberId = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/openMember':
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

export const schedule = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceSchedule':
      return payload
    default:
      return state
  }
}

export const roles = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceRoles':
      return payload
    default:
      return state
  }
}


export default combineReducers({
  members: combineReducers({
    membersById,
    memberIdsByAlpha,
    memberIdsByLastRoleDate,
  }),
  schedule: combineReducers({
    schedule,
  }),
  roles,
  openMemberId,
  requests,
})
