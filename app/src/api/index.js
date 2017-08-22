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
    readList() {
      return fetchJson(
        '/members',
        { method: 'GET' }
      )
        .then((data) => {
          // What needs to be returned?
          // return ?
        });
    },
    create() {
      return fetchJson(
        '/members',
        { method: 'POST' }
      );
    },
    update(id, member) {
      return fetchJson(
        `/members/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ member }) }
      );
    },
    delete(id) {
      return fetchJson(
        `/members/${id}`,
        {
          method: 'DELETE'
        }
      );
    },
  },
};
