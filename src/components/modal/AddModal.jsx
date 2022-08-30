import React, { useState } from "react";
import styles from "./Modal.module.css";
import FloatingBtn from "../floatingBtn/FloatingBtn";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { isNotEmpty } from "../../util/validate";

function ProductModal({ onInput, onSubmit, onCancel }) {
	const [show, setShow] = useState(false);
	const [inputState, setInputState] = useState({
		blur: {
			name: false,
			price: false,
			description: false,
		},
		valid: {
			name: false,
			price: false,
			description: false,
		},
		isInValid: false,
	});

	const resetState = () => {
		setInputState({
			blur: {
				name: false,
				price: false,
				description: false,
			},
			valid: {
				name: false,
				price: false,
				description: false,
			},
			isInValid: false,
		});
	};

	const handleClose = () => {
		resetState();
		setShow(false);
	};
	const handleCancel = () => {
		handleClose();
		onCancel();
	};
	const handleShow = () => setShow(true);

	const handleBlur = (e) => {
		const { value, id } = e.target;
		setInputState((prevState) => ({
			...prevState,
			blur: {
				...prevState.blur,
				[id]: true,
			},
		}));
		if (isNotEmpty(value)) {
			setInputState((prevState) => ({
				...prevState,
				valid: {
					...prevState.valid,
					[id]: true,
				},
			}));
		} else {
			setInputState((prevState) => ({
				...prevState,
				valid: {
					...prevState.valid,
					[id]: false,
				},
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			Object.values(inputState).every((i) =>
				Object.values(i).every((j) => j === true)
			)
		) {
			onSubmit();
			handleClose();
		} else {
			setInputState((prevState) => ({
				...prevState,
				isInValid: true,
			}));
		}
	};

	return (
		<>
			<div className={styles["floating-btn"]}>
				<FloatingBtn onClick={handleShow} />
			</div>

			<Modal show={show} onHide={handleCancel}>
				<Modal.Header className="text-center" closeButton>
					<Modal.Title>New Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<input
							id="name"
							className={`form-control mb-3 ${
								inputState.blur.name &&
								(inputState.valid.name ? "is-valid" : "is-invalid")
							}`}
							type="text"
							placeholder="Product Name"
							onChange={onInput}
							onKeyDown={handleBlur}
							onBlur={handleBlur}
						/>
						<input
							id="price"
							className={`form-control mb-3 ${
								inputState.blur.price &&
								(inputState.valid.price ? "is-valid" : "is-invalid")
							}`}
							type="number"
							placeholder="Product Price"
							onChange={onInput}
							onKeyDown={handleBlur}
							onBlur={handleBlur}
						/>
						<textarea
							id="description"
							className={`form-control mb-3 ${
								inputState.blur.description &&
								(inputState.valid.description ? "is-valid" : "is-invalid")
							}`}
							type="text"
							placeholder="Product Description"
							rows={10}
							onChange={onInput}
							onKeyDown={handleBlur}
							onBlur={handleBlur}
						/>
						<Button className="me-3" type="submit" variant="primary">
							Add Product
						</Button>
						<Button variant="secondary" onClick={handleCancel}>
							Close
						</Button>
						{inputState.isInValid && (
							<Alert className="mt-2" key={"danger"} variant={"danger"}>
								Please fill all the fields
							</Alert>
						)}
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ProductModal;
