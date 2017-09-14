import { normalize, Schema, arrayOf } from 'normalizr'
const members = new Schema('members', { idAttribute: '_id'})

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
  members: {
    create() {
      return fetchJson(
        '/result',
        { method: 'POST' }
      );
    },
    read() {
      return fetchJson(
        '/members',
        { method: 'GET' }
      )
        .then((data) => {
          // console.log(data)
          const normalized = normalize(data, arrayOf(members))
          const o = {
            members: normalized.entities.members || {},
            ids: normalized.result,
          }
          // console.log(o)
          return o
        });
    },
    update(id, email) {
      console.log('members.update: id', id)
      return fetchJson(
        `/members/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ email }) }
      );
    },
    delete(id) {
      return fetchJson(
        `/result/${id}`,
        {
          method: 'DELETE'
        }
      );
    },
  },
};
