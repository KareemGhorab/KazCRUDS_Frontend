import axios from "axios/dist/axios.min";
import { useCallback, useEffect, useState } from "react";

const useGet = (url) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const getData = useCallback(() => {
		setIsLoading(true);
		axios
			.get(url)
			.then(({ data }) => {
				setData(data);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [url]);

	useEffect(() => {
		getData();
	}, [getData]);

	return [data, isLoading, error, getData];
};

export default useGet;
