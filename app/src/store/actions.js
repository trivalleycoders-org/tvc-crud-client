import api from '../api/index'
import { log } from '../lib/ke-utils'

 export const replaceMembers = (members) => {
  // ku.log('replaceMembers: members', members, 'orange')
  log('actions.replaceMembers', '', 'yellow')
  return({
    type: 'app/replaceMembers',
    payload: members,
  })
}

export const openMember = (id) => {
  // log('actions.openmemberId: id', id, 'orange')
  log('actions.openMember', '', 'yellow')
  return ({
    type: 'app/openMember',
    payload:  { id } ,
  })
}

export const createMember = (member) => {
  // log('actions.createMember: member.id', member.id, 'orange')
  // log('actions.createMember: member', member, 'orange')
  log('actions.createMember', '', 'yellow')
  return ({
    type: 'app/createMember',
    payload: member,
  })
}

export const updateMemberLocal = (id, field, value) => {
  // log('actions.updateMemberLocal: member_id', member_id, 'orange')
  // log('actions.updateMemberLocal: member', member, 'orange')
  log('actions.updateMemberLocal', '', 'yellow')
  return ({
    type: 'app/updateMemberLocal',
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
  log('actions.deleteMember', '', 'yellow')
  // ku.log('actions.deleteMember: member_id', member_id, 'orange')
  return ({
    type: 'app/deleteMember',
    payload: { member_id },
  })
}

export const replaceSchedule = (schedule) => {
  log('actions.replaceSchedule', '', 'yellow')
 // log('actions.replaceSchedule: schedule', schedule, 'orange')
 return({
   type: 'app/replaceSchedule',
   payload: schedule,
 })
}

export const replaceRoles = (roles) => {
  log('actions.replaceRoles', '', 'yellow')
 // log('actions.replaceMembers: roles', roles, 'orange')
 return({
   type: 'app/replaceRoles',
   payload: roles,
 })
}

export const replaceExclusions = (exclusions) => {
 // ku.log('actions.replaceMembers: exclusions', exclusions, 'orange')
 log('actions.replaceExclusions', '', 'yellow')
 return({
   type: 'app/replaceExclusions',
   payload: exclusions,
 })
}

export const closeMember = (result) => {
  log('actions.closeMember', result, 'yellow')
  return ({
    type: 'app/closeMember',
  })
}

export const markRequestPending = (key) => {
  log(`pending (${key})`, '', 'blue')
  return {
    type: 'app/markRequestPending',
    meta: { key },
  }
};

export const markRequestSuccess = (key) => {
  log(`success (${key})`, '', 'blue')
  return ({
    type: 'app/markRequestSuccess',
    meta: { key },
  });
}

export const markRequestFailed = (reason, key) => {
  log(`failed (${key})`, '', 'blue')
  return {
    type: 'app/markRequestFailed',
    payload: reason,
    meta: { key },
  }
}

export const createRequestThunk = ({ request, key, start = [], success = [], failure = [] }) => {
  return (...args) => (dispatch) => {
    const requestKey = (typeof key === 'function') ? key(...args) : key;

    start.forEach((actionCreator) => dispatch(actionCreator()));
    dispatch(markRequestPending(requestKey));
    return request(...args)
      .then((data) => {
        success.forEach((actionCreator) => {
          // log(`actionCreator.type=${actionCreator}`, '', 'red')
          dispatch(actionCreator(data))
        })
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
  log('actions.logReturnValue', value, 'green')
  return ({
    type: 'app/noAction'
  })
}

export const requestReadMembers = createRequestThunk({
  request: api.members.read,
  key: 'api/getReadMembers',
  success: [ replaceMembers,  (value) => logReturnValue(value)],
})

// const testAction = () => {
//   log('error', '', 'red')
// }
export const requestUpdateMember = createRequestThunk({
  request: api.members.update,
  key: (member_id) => `api/updateMember/${member_id}`,
  success: [ closeMember,  (value) => logReturnValue(value) ],
  failure: [ (value) => logReturnValue(value)]
  // failure: [ (err) => logError(err) ],
  // failure: [ testAction ]
})

// Retnruns a member with id property only
export const requestCreateMember = createRequestThunk({
  request: api.members.create,
  key: 'api/createMember',
  success: [ createMember, (member) => openMember(member.id), requestReadMembers,  (value) => logReturnValue(value) ],
  failure: [ (err) => logError(err) ],
})

export const requestDeleteMember = createRequestThunk({
  request: api.members.delete,
  key: (member_id) => `api/deleteMember/${member_id}`,
  success: [ (member_id) => deleteMember(member_id) ,  (value) => logReturnValue(value) ],
})

export const requestReadSchedule = createRequestThunk({
  request: api.schedule.read,
  key: 'api/getReadSchedule',
  success: [ replaceSchedule,  (value) => logReturnValue(value) ],
})

export const requestReadRoles = createRequestThunk({
  request: api.roles.read,
  key: 'api/getReadRoles',
  success: [ replaceRoles,  (value) => logReturnValue(value) ],
})

export const requestReadExclusions = createRequestThunk({
  request: api.schedule.exclusions,
  key: 'api/getReadExclusions',
  success: [ replaceExclusions,  (value) => logReturnValue(value) ],
})
