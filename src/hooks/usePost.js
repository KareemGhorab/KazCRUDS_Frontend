import axios from "axios/dist/axios.min";
import { useCallback, useState } from "react";

const usePost = (url) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const postData = useCallback(
		(body) => {
			return new Promise((resolve, reject) => {
				setIsLoading(true);
				axios
					.post(url, body)
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

	return [data, isLoading, error, postData];
};

export default usePost;
