import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // custom hook for fetching data from the database 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();

                if (response.ok) {
                    setData(result.data);
                } else {
                    setError(result.error);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [url]);

    return { data, error };

};

export default useFetch;


