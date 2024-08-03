function postFetcherJson(fullUrl, token, payload) {
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      credentials: 'include'
    },
    body: JSON.stringify(payload)
  });
}

export default postFetcherJson;
