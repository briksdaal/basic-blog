import useAuth from './useAuth';

function useLogout() {
  const { auth, setAuth } = useAuth();

  function logout() {
    fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`
      },
      credentials: 'include'
    }).then(async (res) => {
      if (res.status === 204) {
        setAuth({});
      }
    });
  }

  return logout;
}

export default useLogout;
