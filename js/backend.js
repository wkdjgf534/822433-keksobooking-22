// Requests to server
const POST_SERVER_URL = 'https://22.javascript.pages.academy/keksobooking'
const GET_SERVER_URL = `${POST_SERVER_URL}/data`

const getData = (onSuccess, onError) => {
  fetch(GET_SERVER_URL)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError())
}

const sendData = (onSuccess, onError, data) => {
  fetch(POST_SERVER_URL,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess()
      } else {
        throw new Error()
      }
    })
    .catch(() => onError())
}

export {getData, sendData}
