import { useEffect, useState } from 'react';

export default function useFetch (fetchFn, initialValue)
{
  const [isLoading, setIsLoading] = useState();
  const [loadingError, setLoadingError] = useState(null);
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(function ()
  {
    fetchData();

    async function fetchData ()
    {
      try
      {
        setIsLoading(true);
        const data = await fetchFn();
        setFetchedData(data);
      }
      catch (error)
      {
        setLoadingError({ message: `Данные не получены. ( ${error.message})` });
      }
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    loadingError,
    fetchedData,
    setFetchedData,
  };
}
