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
          let o = data.json()
          console.log(o)
          return o
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
