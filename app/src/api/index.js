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
  result: {
    create() {
      return fetchJson(
        '/result',
        { method: 'POST' }
      );
    },
    read() {
      return fetchJson(
        '/result',
        { method: 'GET' }
      )
        .then((data) => {
          // What needs to be returned?
          // return ?
        });
    },
    update(id, result) {
      return fetchJson(
        `/result/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ result }) }
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
