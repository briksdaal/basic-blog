import { useState } from 'react';
import useRefresh from './useRefresh';
import useAuth from './useAuth';

function useFormAction(suffixUrl = '', fetcher) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState(false);
  const { auth } = useAuth();
  const refresh = useRefresh();

  const baseUrl = import.meta.env.VITE_API_URL;
  const fullUrl = baseUrl + suffixUrl;

  function action(formData) {
    setLoading(true);
    setErrors('');
    setSuccess(false);

    fetcher(fullUrl, auth.token, formData)
      .then((res) => {
        if (res.status === 401 || 403) {
          return refresh().then((token) => {
            if (!token) {
              throw new Error(res.status);
            }
            return fetcher(fullUrl, token, formData);
          });
        }

        return res;
      })
      .then(async (res) => {
        if (res.status > 200) {
          const errors = await res.json();
          throw new Error(errors?.errors?.errors[0].msg);
        }
        return res.json();
      })
      .then(() => {
        setSuccess(true);
        setErrors(null);
      })
      .catch((error) => {
        setErrors(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return { action, loading, errors, success };
}

export default useFormAction;
