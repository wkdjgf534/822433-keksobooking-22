// Requests to server
const POST_SERVER_URL = 'https://22.javascript.pages.academy/keksobooking'
const GET_SERVER_URL = `${POST_SERVER_URL}/data`

const getData = async (onSuccess, onError) => {
  const response = await fetch(GET_SERVER_URL)
  try {
    if (response.ok) {
      const data = await response.json()
      return onSuccess(data)
    }
    throw new Error ()
  } catch (error) {
    onError()
  }
}

const sendData = async (onSuccess, onError, data) => {
  let response
  try {
    response = await fetch(POST_SERVER_URL,
      {
        method: 'POST',
        body: data,
      },
    )
  } catch (error) {
    return onError()
  }
  response.ok ? onSuccess() : onError()
}

export {getData, sendData}
