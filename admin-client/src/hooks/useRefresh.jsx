import useAuth from './useAuth';

function useRefresh() {
  const { setAuth } = useAuth();

  async function refresh() {
    return fetch(`${import.meta.env.VITE_API_URL}/tokens`, {
      method: 'POST',
      credentials: 'include'
    })
      .then((res) => {
        if (res > 200) {
          throw new Error();
        }

        return res.json();
      })
      .then((data) => {
        setAuth((auth) => ({ ...auth, token: data.token }));
        return data.token;
      })
      .catch((err) => null);
  }

  return refresh;
}

export default useRefresh;
