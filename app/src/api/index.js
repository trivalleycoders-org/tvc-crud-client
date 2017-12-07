import { normalize, Schema, arrayOf } from 'normalizr'
import * as ku from '../lib/ke-utils'


const next6 = new Schema('next6', { idAttribute: 'sequence'})
const roles = new Schema('roles', { idAttribute: 'role_id'})
const exclusions = new Schema('exclusions', { idAttribute: 'exclusion_id'})

export const rejectErrors = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  return Promise.reject({ message: res.statusText });
};

export const fetchJson = (url, options = {}) => (

  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(rejectErrors)
  .then((res) => res.json())//I bet this .json does not need to be here
);

export default {
  schedule: {
    scheduleMembers() {
      return fetchJson(
        '/schedule/scheduleMembers',
        { method: 'GET'}
      )
      .then((data) => {
        ku.log('api.schedule.scheduleMembers: data', data, 'yellow')
        const normalized = normalize(data, arrayOf(next6))
        const o = {
          scheduleMembers: normalized.entities.next6 || {},
          ids: normalized.result,
        }
        ku.log('api.schedule.scheduleMembers: o', o, 'yellow')
        return o
      })
    },
    roles() {
      return fetchJson(
        '/schedule/roles',
        { method: 'GET'}
      )
      .then((data) => {
        // ku.log('api.schedule.roles: data', data, 'yellow')
        const normalized = normalize(data, arrayOf(roles))
        const o = {
          roles: normalized.entities.roles || {},
          ids: normalized.result,
        }
        // ku.log('api.schedule.roles: o', o, 'yellow')
        return o
      })
    },
    exclusions() {
      return fetchJson(
        '/schedule/exclusions',
        { method: 'GET'}
      )
      .then((data) => {
        // ku.log('api.schedule.exclusions: data', data, 'yellow')
        const normalized = normalize(data, arrayOf(exclusions))
        const o = {
          exclusions: normalized.entities.exclusions || {},
          ids: normalized.result,
        }
        // ku.log('api.schedule.exclusions: o', o, 'yellow')
        return o
      })
    }
  },
  members: {
    create(member) {
      return fetchJson(
        '/members',
        {
          method: 'POST',
          body: JSON.stringify({ member })
        }
      );
    },
    read() {
      return fetchJson(
        '/members',
        { method: 'GET' }
      )
    },
    update(id, member) {
      //ku.log('api.members.update: id', id, 'orange')
      //ku.log('api.members.update: member', member, 'orange')
      return fetchJson(
        `/members/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ member })
        }
      );
    },
    delete(id) {
      return fetchJson(
        `/members/${id}`,
        {
          method: 'DELETE'
        }
      )
      .then((data) => {
        console.log(data)
        return data.affectedRows ? id : -1
      });
    },
  },
};
