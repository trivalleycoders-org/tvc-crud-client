import api from '../api/index'
import { log } from '../lib/ke-utils'

 export const replaceMembers = (members) => {
  // ku.log('replaceMembers: members', members, 'blue')
  return({
    type: 'app/replaceMembers',
    payload: members,
  })
}

export const openMember = (id) => {
  log('actions.openmemberId: id', id, 'orange')
  return ({
    type: 'app/openMember',
    payload:  { id } ,
  })
}

export const createMember = (member) => {
  log('actions.createMember: member.id', member.id, 'orange')
  log('actions.createMember: member', member, 'orange')
  return ({
    type: 'app/createMember',
    payload: member,
  })
}

export const updateMember = (id, field, value) => {
  // log('actions.updateMember: member_id', member_id, 'orange')
  // log('actions.updateMember: member', member, 'orange')

  return ({
    type: 'app/updateMember',
    // payload: {
    //   'id': member_id,
    //   'firstName': member.firstName,
    //   'lastName': member.lastName,
    //   'email': member.email,
    //   'exempt': member.exempt,
    //   'comment': member.comment,
    //   'phoneNumber': member.phoneNumber,
    //   'active': member.active,
    //   'lastRoleDate': member.lastRoleDate,
    //   'lastRoleName': member.lastRoleName,
    //   'exclusions': member.exclusions,
    // },
    payload: {
      id,
      field,
      value,
    }
  })
}

export const deleteMember = (member_id) => {
  // ku.log('actions.deleteMember: member_id', member_id, 'orange')
  return ({
    type: 'app/deleteMember',
    payload: { member_id },
  })
}

export const replaceSchedule = (schedule) => {
 // log('actions.replaceSchedule: schedule', schedule, 'orange')
 return({
   type: 'app/replaceSchedule',
   payload: schedule,
 })
}

export const replaceRoles = (roles) => {
 // log('actions.replaceMembers: roles', roles, 'orange')
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

export const markRequestPending = (key) => ({
  type: 'app/markRequestPending',
  meta: { key },
});

export const markRequestSuccess = (key) => {
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
  log('actions.logError', err, 'red')
}
export const logReturnValue = (value) => {
  log('actions.logReturnValue', value, 'orange')
}
export const requestReadMembers = createRequestThunk({
  request: api.members.read,
  key: 'api/getReadMembers',
  success: [ replaceMembers ],
})

export const requestUpdateMember = createRequestThunk({
  request: api.members.update,
  key: (member_id) => `api/updateMember/${member_id}`,
  success: [ closeMember ],
})

// Retnruns a member with id property only
export const requestCreateMember = createRequestThunk({
  request: api.members.create,
  key: 'api/createMember',
  success: [ createMember, (member) => openMember(member.id), requestReadMembers ],
  failure: [ (err) => logError(err) ],
})

export const requestDeleteMember = createRequestThunk({
  request: api.members.delete,
  key: (member_id) => `api/deleteMember/${member_id}`,
  success: [ (member_id) => deleteMember(member_id) ],
})

export const requestReadSchedule = createRequestThunk({
  request: api.schedule.read,
  key: 'api/getReadSchedule',
  success: [ replaceSchedule ],
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
