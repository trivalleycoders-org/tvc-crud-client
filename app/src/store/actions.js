import api from '../api/index'
import * as ku from '../lib/ke-utils'
/*
    payload must always be an object. If you are passing in a string you must put it in an object: e.g., payload: { value }. If the parameter(s) pass in are already an object then do: e.g., payload: objectName.
 */
 export const replaceMembers = (members) => {
  // ku.log('replaceMembers: members', members, 'blue')
  return({
    type: 'app/replaceMembers',
    payload: members,
  })
}

export const openMember = (member_id) => {
  return ({
    type: 'app/openMember',
    payload: { member_id },
  })
}

export const createMember = () => {
  return ({
    type: 'app/createMember',
    payload: {
      'member_id': 'create',
      'first_name': '',
      'last_name': '',
      'email': '',
      'exempt': false,
      'comment': '',
      'phone_number': '',
      'active': 1,
    },
  })
}

export const updateMember = (member_id, member) => {
  // ku.log('actions.updateMember: member_id', member_id, 'orange')
  // ku.log('actions.updateMember: member', member, 'orange')

  return ({
    type: 'app/updateMember',
    payload: {
      'member_id': member_id,
      'first_name': member.first_name,
      'last_name': member.last_name,
      'email': member.email,
      'exempt': member.exempt,
      'comment': member.comment,
      'phone_number': member.phone_number,
      'active': member.active,
    },
  })
}

export const deleteMember = (member_id) => {
  // ku.log('actions.deleteMember: member_id', member_id, 'orange')
  return ({
    type: 'app/deleteMember',
    payload: { member_id },
  })
}

export const replaceScheduleMembers = (scheduleMembers) => {
 // ku.log('actions.replaceMembers: next6', next6, 'orange')
 return({
   type: 'app/scheduleMembers',
   payload: scheduleMembers,
 })
}

export const replaceRoles = (roles) => {
 // ku.log('actions.replaceMembers: roles', roles, 'orange')
 return({
   type: 'app/replaceRoles',
   payload: roles,
 })
}

export const replaceExclusions = (exclusions) => {
 // ku.log('actions.replaceMembers: exclusions', exclusions, 'orange')
 return({
   type: 'app/replaceExclusions',
   payload: exclusions,
 })
}

export const closeMember = () => {
  return ({
    type: 'app/closeMember',
  })
}

// payload: {role1_id: member32_id, role2_id: member175_id...}
export const setSchedule = (rolesForMembers) => {
  return ({
    type: 'app/setSchedule',
    payload: rolesForMembers,
  })
}

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

export const logError = (err) => {
  console.log(err)
}
export const requestReadMembers = createRequestThunk({
  request: api.members.read,
  key: 'api/getReadMembers',
  success: [ replaceMembers ],
})

// export const requestCreateResult = createRequestThunk({
//   request: api.result.create,
//   key: 'api/createMember',
//   success: [ replaceResult ],
// });
//
export const requestUpdateMember = createRequestThunk({
  request: api.members.update,
  key: (member_id) => `api/updateMember/${member_id}`,
  success: [ closeMember ],
})

export const requestCreateMember = createRequestThunk({
  request: api.members.create,
  key: 'api/createMember',
  success: [ closeMember ],
})

export const requestDeleteMember = createRequestThunk({
  request: api.members.delete,
  key: (member_id) => `api/deleteMember/${member_id}`,
  success: [ (member_id) => deleteMember(member_id) ],
})

export const requestReadScheduleMembers = createRequestThunk({
  request: api.schedule.scheduleMembers,
  key: 'api/getReadScheduleMembers',
  success: [ replaceScheduleMembers ],
})

export const requestReadRoles = createRequestThunk({
  request: api.schedule.roles,
  key: 'api/getReadRoles',
  success: [ replaceRoles ],
})

export const requestReadExclusions = createRequestThunk({
  request: api.schedule.exclusions,
  key: 'api/getReadExclusions',
  success: [ replaceExclusions ],
})
