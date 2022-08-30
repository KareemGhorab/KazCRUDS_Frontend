import axios from "axios/dist/axios.min";
import { useCallback, useState } from "react";

const useGet = (url) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const searchData = useCallback(
		(name) => {
			setIsLoading(true);
			axios
				.get(url + `/${name}`)
				.then(({ data }) => {
					setData(data);
				})
				.catch((err) => {
					setError(err);
				})
				.finally(() => {
					setIsLoading(false);
				});
		},
		[url]
	);

	return [data, isLoading, error, searchData];
};

export default useGet;
