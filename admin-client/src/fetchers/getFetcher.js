function getFetcher(fullUrl, token) {
  return fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      credentials: 'include'
    }
  });
}

export default getFetcher;
