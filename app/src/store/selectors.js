import { log } from '../lib/ke-utils'

export const getMembers = (state) => {
  return state.members.memberIdsByAlpha.map((id) => state.members.membersById[id])
}
export const getMember = (state, id) => {
  return state.members.membersById[id]
}
export const getOpenMemberId = (state) => {
  return state.openMemberId
}
export const getRoles = (state) => {
  return state.roles
}
export const getExclusions = (state) => {
  return state.schedule.exclusionsIds.map((id) => state.schedule.exclusionsById[id]);
}
export const getSchedule = (state) => {
  return state.schedule.schedule
}
export const getMemberIdsByLastRoleDate = (state) => {
  return state.members.memberIdsByLastRoleDate
}
// redux selectors
export const getRequest = (state, key) => {
  const ret = state.requests[key] || {}
  // log(`getRequest (${key})`, ret, 'blue')
  return ret
}


export const getRequests = (state) =>
  state.requests

export const areRequestsPending = (requests) => {
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending')
};
