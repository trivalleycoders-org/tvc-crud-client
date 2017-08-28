import api from '../api/index'

/*
    payload must always be an object. If you are passing in a string you must put it in an object: e.g., payload: { value }. If the parameter(s) pass in are already an object then do: e.g., payload: objectName.
 */
 export const replaceResult = (result) => ({
   type: 'app/replaceResult',
   payload: result,
 });

 export const readResult = (result) => {
  return {
    type: 'app/readResult',
    payload: result,
  }
};

export const updateResult = ( _id, firstName, lastName, email ) => {
  return {
    type: 'app/updateResult',
    payload: {
      _id,
      firstName,
      lastName,
      email,
    }
  }
}

export const deleteResult = (_id) => ({
  type: 'app/deleteResult',
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

export const requestReadResult = createRequestThunk({
  request: api.result.read,
  key: 'api/getReadResult',
  success: [ replaceResult ]
})

export const requestCreateResult = createRequestThunk({
  request: api.result.create,
  key: 'api/createMember',
  success: [ replaceResult ],
});

export const requestUpdateMember = createRequestThunk({
  request: api.result.update,
  key: (_id) => `api/updateMember/${_id}`,
  success: [ replaceResult ],
})

export const requestDeleteMember = createRequestThunk({
  request: api.result.delete,
  key: (_id) => `api/deleteMember/${_id}`,
  success: [ (result) => deleteResult(result._id) ],
})
