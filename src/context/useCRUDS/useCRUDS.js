import { useContext, createContext, useState, useEffect, useMemo } from "react";

import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";
import useDelete from "../../hooks/useDelete";
import useSearch from "../../hooks/useSearch";

const crudsContext = createContext();

const useCRUDS = () => useContext(crudsContext);

export const CrudsProvider = ({ crudsBaseUrl, children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);

	const [getData, isLoadingGetData, , reGetData] = useGet(crudsBaseUrl);
	const [postData, isLoadingPostData, , rePostData] = usePost(crudsBaseUrl);
	const [searchData, isLoadingSearchData, , reSearchData] =
		useSearch(crudsBaseUrl + "/search");
	const [updateData, isLoadingUpdateData, , reUpdateData] =
		usePut(crudsBaseUrl);
	const [deleteData, isLoadingDeleteData, , reDeleteData] =
		useDelete(crudsBaseUrl);

	useEffect(() => {
		setIsLoading(
			isLoadingGetData ||
				isLoadingPostData ||
				isLoadingUpdateData ||
				isLoadingDeleteData ||
				isLoadingSearchData
		);
	}, [
		isLoadingGetData,
		isLoadingPostData,
		isLoadingUpdateData,
		isLoadingDeleteData,
		isLoadingSearchData,
	]);

	useEffect(() => {
		setData(getData);
	}, [getData]);

	useEffect(() => {
		setData(searchData);
	}, [searchData]);

	useEffect(() => {
		reGetData();
	}, [postData, deleteData, updateData, reGetData]);

	return (
		<crudsContext.Provider
			value={[
				data,
				isLoading,
				useMemo(
					() => ({
						get: reGetData,
						add: rePostData,
						del: reDeleteData,
						update: reUpdateData,
						search: reSearchData,
					}),
					[reDeleteData, reGetData, rePostData, reSearchData, reUpdateData]
				),
			]}
		>
			{children}
		</crudsContext.Provider>
	);
};

export default useCRUDS;
