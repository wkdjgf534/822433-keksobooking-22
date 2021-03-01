// Requests to server
const POST_SERVER_URL = 'https://22.javascript.pages.academy/keksobooking'
const GET_SERVER_URL = `${POST_SERVER_URL}/data`

const getData = async (onSuccess, onError) => {
  let response
  let data
  try {
    response = await fetch(GET_SERVER_URL)
    data = await response.json()
  } catch (error) {
    return onError()
  }
  onSuccess(data)
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
