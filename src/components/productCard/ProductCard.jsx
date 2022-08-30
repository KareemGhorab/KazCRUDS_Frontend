import UpdateModal from "../modal/UpdateModal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useCRUDS from "../../context/useCRUDS/useCRUDS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useState } from "react";
import {currencyFormatter} from "../../util/currency"

function ProductCard({ index }) {
	const [products, isLoading, productsFunctions] = useCRUDS();
	const currentProduct = products?.result[index];
	const { id, name, price, description } = currentProduct;
	const [updateInput, setUpdateInput] = useState({
		name,
		price,
		description,
	});

	const handleCancel = () => {
		setUpdateInput({
			name,
			price,
			description,
		});
	};

	const handleUpdateInput = useCallback((e) => {
		setUpdateInput((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	}, []);

	const handleUpdateSubmit = useCallback(() => {
		productsFunctions.update(id, updateInput);
	}, [id, productsFunctions, updateInput]);

	const handleDelete = useCallback(
		() => productsFunctions.del(id),
		[id, productsFunctions]
	);

	if (isLoading) {
		return (
			<FontAwesomeIcon className="text-main" icon={faSpinner} size="4x" spin />
		);
	}

	return (
		<Card>
			<Card.Body className="text-center">
				<Card.Title>
					<h4 className="h3">{name}</h4>
				</Card.Title>
				<Card.Subtitle className="mb-3 text-muted">{currencyFormatter(price)}</Card.Subtitle>
				<Card.Text>{description}</Card.Text>
				<div className="d-flex justify-content-between">
					<UpdateModal
						onChange={handleUpdateInput}
						onSubmit={handleUpdateSubmit}
						onCancel={handleCancel}
						product={updateInput}
					/>
					<Button variant="danger" className="w-50" onClick={handleDelete}>
						Delete
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}

export default ProductCard;
