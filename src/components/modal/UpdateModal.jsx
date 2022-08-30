import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UpdateModal({ onChange, onSubmit, onCancel, product }) {
	const [show, setShow] = useState(false);
	const { name, price, description } = product;

	const handleClose = () => {
		setShow(false);
	};
	const handleCancel = () => {
		setShow(false);
		onCancel();
	};
	const handleShow = () => setShow(true);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit();
		handleClose();
	};

	return (
		<>
			<Button variant="warning" className="w-50 me-1" onClick={handleShow}>
				Update
			</Button>

			<Modal show={show} onHide={handleCancel}>
				<Modal.Header className="text-center" closeButton>
					<Modal.Title>Update Product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<input
							id="name"
							className="form-control mb-3"
							type="text"
							value={name}
							onChange={onChange}
						/>
						<input
							id="price"
							className="form-control mb-3"
							type="number"
							value={price}
							onChange={onChange}
						/>
						<textarea
							id="description"
							className="form-control mb-3"
							type="text"
							value={description}
							rows={10}
							onChange={onChange}
						/>
						<Button className="me-3" type="submit" variant="warning">
							Update
						</Button>
						<Button variant="secondary" onClick={handleCancel}>
							Close
						</Button>
					</form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default UpdateModal;
