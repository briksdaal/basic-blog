import { useState } from 'react';

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  function login(data) {
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    fetch(`${import.meta.env.VITE_API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
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

        console.log(data);
      })
      .catch((err) => {
        setErrorMsg(err.message);
      })
      .finally(() => setLoading(false));
  }

  return [login, loading, errorMsg, success];
}

export default useLogin;
