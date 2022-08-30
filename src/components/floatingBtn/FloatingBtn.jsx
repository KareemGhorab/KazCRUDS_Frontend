import React from "react";
import styles from "./FloatingBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function FloatingBtn({ onClick }) {
	return (
		<button
			className={`bg-main text-white rounded-circle ${styles["floating-btn"]}`}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={faPlus} size="3x" beat />
		</button>
	);
}
