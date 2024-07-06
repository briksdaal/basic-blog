import { useState, useEffect } from 'react';

function useFetch(suffixUrl = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL;
  const fullUrl = baseUrl + suffixUrl;

  useEffect(() => {
    setLoading(true);
    fetch(fullUrl)
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
  }, [suffixUrl]);

  return [data, loading, error];
}

export default useFetch;
