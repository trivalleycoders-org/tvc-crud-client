import { log } from '../lib/ke-utils'

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
    read(date) {
      return fetchJson(
        `/schedule/${date}`,
        { method: 'GET'}
      )
      .then((data) => {
        // log('api.schedule.schedule: data.length', data.length, 'yellow')
        // log('api.schedule.schedule: data', data, 'yellow')
        return data
      })
    },
    roles() {
      return fetchJson(
        '/schedule/roles',
        { method: 'GET'}
      )
    },
    exclusions() {
      return fetchJson(
        '/schedule/exclusions',
        { method: 'GET'}
      )
      .then((data) => {
        return data
      })
    }
  },
  roles: {
    read() {
      return fetchJson(
        '/roles',
        { method: 'GET'}
      )
    }
  },
  members: {
    create() {
      // log('api.members.create: member', member, 'orange')
      return fetchJson(
        '/members',
        {
          method: 'POST',
          // body: JSON.stringify({ member })
        }
      ).then((id) => {
        return id
      })
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
      member.status = null
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
        // console.log(data)
        return data.affectedRows ? id : -1
      });
    },
  },
};
