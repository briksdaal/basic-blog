import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import useRefresh from './useRefresh';

function useFetch(suffixUrl = '', fetcher, trigger) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const refresh = useRefresh();

  const baseUrl = import.meta.env.VITE_API_URL;
  const fullUrl = baseUrl + suffixUrl;

  useEffect(() => {
    setLoading(true);
    fetcher(fullUrl, auth.token)
      .then((res) => {
        if (res.status === 401) {
          return refresh().then((token) => {
            if (!token) {
              throw new Error(res.status);
            }
            return fetcher(fullUrl, token);
          });
        }

        return res;
      })
      .then((res) => {
        if (res.status > 200) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [suffixUrl, trigger]);

  return [data, loading, error];
}

export default useFetch;
