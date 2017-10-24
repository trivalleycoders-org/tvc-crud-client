export const getMembers = (state) => {
  return state.members.membersIds.map((id) => state.members.membersById[id])
}
export const getOpenMemberId = (state) => {
  return state.openMemberId
}
export const getScheduleMembers = (state) => {
  return state.schedule.scheduleMembersIds.map((id) => state.schedule.scheduleMembersById[id])
}
export const getRoles = (state) => {
  return state.schedule.rolesIds.map((id) => state.schedule.rolesById[id]);
}
export const getExclusions = (state) => {
  return state.schedule.exclusionsIds.map((id) => state.schedule.exclusionsById[id]);
}
export const getRolesForMembers = (state) => {
  return state.schedule.scheduleMembersRoles
}
// redux selectors
export const getRequest = (state, key) =>
  state.requests[key] || {}

export const getRequests = (state) =>
  state.requests

export const areRequestsPending = (requests) => {
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending')
};
