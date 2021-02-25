// Requests to server

const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError())
}

const sendData = (url, data, onSuccess, onError) => {
  fetch(url,
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
