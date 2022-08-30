import React, { useEffect, useState } from "react";
import useCRUDS from "../../context/useCRUDS/useCRUDS";

export default function SearchBar() {
	const [, , productsFunctions] = useCRUDS();
	const [searchInput, setSearchInput] = useState("");

	const handleInput = (e) => setSearchInput(e.target.value);

	useEffect(() => {
		const timer = setTimeout(() => {
			productsFunctions.search(searchInput);
		}, 100);
		return () => {
			clearTimeout(timer);
		};
	}, [productsFunctions, searchInput]);

	return (
		<div className="w-50 mx-auto mt-4 d-flex">
			<input
				id="search"
				onChange={handleInput}
				className="form-control"
				type="text"
				placeholder="Search"
			/>
		</div>
	);
}
