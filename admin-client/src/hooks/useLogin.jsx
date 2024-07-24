import { useState } from 'react';
import useAuth from './useAuth';

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const { setAuth } = useAuth();

  function login(formData) {
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        if (res.status > 200) {
          const json = await res.json();
          throw new Error(json.errors[0].msg);
        }
        return res.json();
      })
      .then((data) => {
        setSuccess(true);
        setTimeout(() => {
          setAuth({
            user: formData.email,
            token: data.token,
            admin: data.admin
          });
        }, 1000);
      })
      .catch((err) => {
        setErrorMsg(err.message);
      })
      .finally(() => setLoading(false));
  }

  return [login, loading, errorMsg, success];
}

export default useLogin;
