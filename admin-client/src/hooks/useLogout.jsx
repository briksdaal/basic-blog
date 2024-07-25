import useAuth from './useAuth';

function useLogout() {
  const { auth, setAuth } = useAuth();

  function logout() {
    fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      credentials: 'include'
    }).then(async (res) => {
      setAuth({});
    });
  }

  return logout;
}

export default useLogout;
