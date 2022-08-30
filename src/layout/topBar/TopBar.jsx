import React from "react";
import styles from "./TobBar.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useCRUDS from "../../context/useCRUDS/useCRUDS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function TopBar() {
	const [products, isLoading] = useCRUDS();

	return (
		<div className="bg-main text-white">
			<Container>
				<Row>
					<Col className="d-flex justify-content-between">
						<div className="brand mt-3">
							<figure className={`d-flex align-items-center ${styles.figure}`}>
								<img
									className="w-100"
									src={require("../../assets/images/kazoza_blue.png")}
									alt="Kazoza Can Logo"
								/>
								<figcaption>
									<h1>CRUD</h1>
								</figcaption>
							</figure>
						</div>
						<div className="data bg-sec w-fit px-5 py-3 h-100 d-flex flex-column align-items-center">
							<div className="mb-1">
								<span className="h3">Products count:</span>
							</div>
							{isLoading ? (
								<FontAwesomeIcon icon={faSpinner} size="2x" pulse />
							) : (
								<span className="h3">{products?.result?.length || 0}</span>
							)}
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
