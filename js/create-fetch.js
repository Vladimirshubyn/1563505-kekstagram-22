const REQUEST_DATA = 'https://22.javascript.pages.academy/kekstagram/data';
const REQUEST_FORM = 'https://22.javascript.pages.academy/kekstagram';

const createFetch = function (onSuccess, onError) {
  return fetch(
    REQUEST_DATA,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onError);
};

const postFetch = function (formData, onSuccess, onError) {
  return fetch(
    REQUEST_FORM,
    {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onError);
};



export {createFetch, postFetch};
