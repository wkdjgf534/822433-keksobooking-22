// XMLHttpRequest

const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError())
}

export {getData}