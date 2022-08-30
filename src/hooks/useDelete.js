import axios from "axios/dist/axios.min";
import { useCallback, useState } from "react";

const useDelete = (url) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const deleteData = useCallback(
		(id) => {
			return new Promise((resolve, reject) => {
				setIsLoading(true);

				axios
					.delete(url + `/${id}`)
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

	return [data, isLoading, error, deleteData];
};

export default useDelete;
