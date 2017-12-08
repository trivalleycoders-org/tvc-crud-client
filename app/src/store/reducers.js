import { combineReducers } from 'redux'
import { merge, prepend, dissoc, without } from 'ramda'
import * as ku from '../lib/ke-utils'

export const membersById = ( state = {}, { type, payload }) => {

  try {
    switch (type) {
      case 'app/updateMemberFormFields':
      case 'app/updateMember':
      case 'app/createMember': // new/add & update
        // ku.log('reducers.openMemberId app/openMember: type', type, 'orange')
        return merge(state, { [payload.id]: payload })
      case 'app/deleteMember':
        return dissoc(payload.id, state)
      case 'app/replaceMembers': // read list load all
        // ku.log("reducers.membersById app/replaceMembers: payload", payload, 'orange')
        // return payload.members
        console.log('payload:', payload)
        return payload.membersById
      default:
        return state
    }
  } catch (e) {
    ku.log('reducers.membersById', e, 'red')
  }
}

// export const membersIds = (state = [], { type, payload }) => {
export const memberIdsByAlpha = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceMembers':
      // ku.log('reducers.membersIds app/replaceMembers: payload', payload, 'orange')
      return payload.idsByAlpha
    case 'app/createMember':
      return prepend(payload.id, state)
    case 'app/deleteMember':
      // ku.log('reducers.membersIds app/deleteMember: payload', payload, 'orange')
      return without([payload.id], state)
    default:
      return state
  }
}

export const openMemberId = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/openMember':
    case 'app/createMember':
      // ku.log('reducers.openMemberId app/openMember: type', type, 'orange')
      // ku.log('reducers.openMemberId app/openMember: payload', payload, 'orange')
      return payload.member_id
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

export const scheduleMembersById = (state = null, { type, payload }) => {

  switch (type) {
    case 'app/scheduleMembers':
      return payload.scheduleMembers
    default:
      return state
  }
}

export const scheduleMembersIds = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/scheduleMembers':
      return payload.ids
    default:
      return state
  }
}

export const rolesById = (state = null, { type, payload }) => {
  // ku.log('reducers.rolesById: type', type, 'orange')
  // ku.log('reducers.rolesById: payload', payload, 'orange')
  switch (type) {
    case 'app/replaceRoles':
      return payload.roles
    default:
      return state
  }
}

export const rolesIds = (state = [], { type, payload }) => {
  // ku.log('reducers.rolesIds: type', type, 'orange')
  // ku.log('reducers.rolesIds: payload', payload, 'orange')
  switch (type) {
    case 'app/replaceRoles':
      return payload.ids
    default:
      return state
  }
}

export const exclusionsById = (state = null, { type, payload }) => {
  // ku.log('reducers.exclusionsById: type', type, 'orange')
  // ku.log('reducers.exclusionsById: payload', payload, 'orange')
  switch (type) {
    case 'app/replaceExclusions':
      return payload.exclusions
    default:
      return state
  }
}

export const exclusionsIds = (state = [], { type, payload }) => {
  // ku.log('reducers.exclusionsIds: type', type, 'orange')
  // ku.log('reducers.exclusionsIds: payload', payload, 'orange')
  switch (type) {
    case 'app/replaceExclusions':
      return payload.ids
    default:
      return state
  }
}

export const upcomingSchedule = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/setSchedule':
      return merge(state, payload)
    default:
      return state
  }
}


// Some reducers will be removed once Schedule is rewritten to work with the new data structure
export default combineReducers({
  members: combineReducers({
    membersById,
    memberIdsByAlpha,
  }),
  schedule: combineReducers({
    scheduleMembersById,
    scheduleMembersIds,
    rolesById,
    rolesIds,
    exclusionsById,
    exclusionsIds,
    upcomingSchedule,
  }),
  openMemberId,
  requests,
})
