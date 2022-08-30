import ProductCard from "../../components/productCard/ProductCard";
import useCRUDS from "../../context/useCRUDS/useCRUDS";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const DataShow = () => {
	const [products, isLoading] = useCRUDS();

	if (isLoading) {
		return (
			<div className="py-5 text-main d-flex align-items-center justify-content-center">
				<FontAwesomeIcon icon={faSpinner} size="10x" pulse />
			</div>
		);
	}
	return products?.result?.map((product, index) => {
		return (
			<Col key={product.id} lg="3">
				<ProductCard index={index} />
			</Col>
		);
	});
};

export default DataShow;
