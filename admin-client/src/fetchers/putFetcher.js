function putFetcher(fullUrl, token, payload) {
  const formData = new FormData();

  Object.entries(payload).forEach((e) => {
    if (e[0] === 'image' && e[0].length) {
      formData.append(e[0], payload.removeImage ? '' : e[1][0]);
    } else {
      formData.append(e[0], e[1]);
    }
  });

  return fetch(fullUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      credentials: 'include'
    },
    body: formData
  });
}

export default putFetcher;
