function deleteFetcher(fullUrl, token) {
  return fetch(fullUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      credentials: 'include'
    }
  });
}

export default deleteFetcher;
