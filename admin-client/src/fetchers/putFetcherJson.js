function putFetcherJson(fullUrl, token, payload) {
  return fetch(fullUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      credentials: 'include'
    },
    body: JSON.stringify(payload)
  });
}

export default putFetcherJson;
