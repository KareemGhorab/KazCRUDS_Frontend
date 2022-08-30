import React, { useState } from "react";
import ReactDOM from "react-dom";
import useCRUDS from "../../context/useCRUDS/useCRUDS";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProductModal from "../../components/modal/AddModal";
import DataShow from "../../components/dataShow/DataShow";

const INPUT_RESET = {
	name: "",
	price: "",
	description: "",
};

export default function Home() {
	const [, , productsFunctions] = useCRUDS();
	const [inputState, setInputState] = useState({
		...INPUT_RESET,
	});

	const resetInput = () => {
		setInputState({ ...INPUT_RESET });
	};

	const handleInput = (e) => {
		setInputState((prevInput) => {
			return {
				...prevInput,
				[e.target.id]: e.target.value,
			};
		});
	};

	const handleAdd = () => {
		productsFunctions.add(inputState);
	};

	return (
		<>
			<Container fluid="md my-5">
				<Row className="gy-4">
					<DataShow />
				</Row>
			</Container>
			{ReactDOM.createPortal(
				<ProductModal
					onInput={handleInput}
					onSubmit={handleAdd}
					onCancel={resetInput}
				/>,
				document.getElementById("modal-root")
			)}
		</>
	);
}
