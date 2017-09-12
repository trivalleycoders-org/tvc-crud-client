export const getMembers = (state) => {
  return state.members.membersIds.map((_id) => state.members.membersById[_id]);
}

// redux selectors
export const getRequest = (state, key) =>
  state.requests[key] || {};

export const getRequests = (state) =>
  state.requests;

export const areRequestsPending = (requests) => {
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending');
};
