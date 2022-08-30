import axios from "axios/dist/axios.min";
import { useCallback, useState } from "react";

const usePut = (url) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const putData = useCallback(
		(id, body) => {
			return new Promise((resolve, reject) => {
				setIsLoading(true);

				axios
					.put(url + `/${id}`, body)
					.then(({ data }) => {
						setData(data);
						resolve();
					})
					.catch((err) => {
						setError(err);
						reject();
					})
					.finally(() => {
						setIsLoading(false);
					});
			});
		},
		[url]
	);

	return [data, isLoading, error, putData];
};

export default usePut;
