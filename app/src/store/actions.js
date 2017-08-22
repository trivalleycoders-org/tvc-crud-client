import api from '../api/index'

/*
    payload must always be an object. If you are passing in a string you must put it in an object: e.g., payload: { value }. If the parameter(s) pass in are already an object then do: e.g., payload: objectName.
 */
 export const updateAllMembers = (members) => ({
   type: 'app/replaceMembers',
   payload: members,
 });

 export const createMember = (member) => {
  return {
    type: 'app/createMember',
    payload: member,
  }
};

export const updateOneMember = ( _id, firstName, lastName, email ) => {
  return {
    type: 'app/updateMember',
    payload: {
      _id,
      firstName,
      lastName,
      email,
    }
  }
}

export const removeMember = (_id) => ({
  type: 'app/removeMember',
  payload: { _id },
});

export const markRequestPending = (key) => ({
  type: 'app/markRequestPending',
  meta: { key },
});

export const markRequestSuccess = (key) => {
  // you can use console.log() here
  return ({
    type: 'app/markRequestSuccess',
    meta: { key },
  });
}


export const markRequestFailed = (reason, key) => ({
  type: 'app/markRequestFailed',
  payload: reason,
  meta: { key },
});

export const createRequestThunk = ({ request, key, start = [], success = [], failure = [] }) => {

  return (...args) => (dispatch) => {
    const requestKey = (typeof key === 'function') ? key(...args) : key;

    start.forEach((actionCreator) => dispatch(actionCreator()));
    dispatch(markRequestPending(requestKey));
    return request(...args)
      .then((data) => {
        success.forEach((actionCreator) => dispatch(actionCreator(data)));
        dispatch(markRequestSuccess(requestKey));
      })
      .catch((reason) => {
        failure.forEach((actionCreator) => dispatch(actionCreator(reason)));
        dispatch(markRequestFailed(reason, requestKey));
      });
  };
};

export const requestGetMemberList = createRequestThunk({
  request: api.members.readList,
  key: 'api/getMemberList',
  success: [ updateAllMembers ]
})

export const requestCreateMember = createRequestThunk({
  request: api.members.create,
  key: 'api/createMember',
  success: [ updateOneMember ],
});

export const requestUpdateMember = createRequestThunk({
  request: api.members.update,
  key: (_id) => `api/updateMember/${_id}`,
  success: [ updateOneMember ],
})

export const requestDeleteMember = createRequestThunk({
  request: api.members.delete,
  key: (_id) => `api/deleteMember/${_id}`,
  success: [ (member) => removeMember(member._id) ],
})
