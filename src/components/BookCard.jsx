import { useNavigate } from "react-router-dom";
export default function Index(props) {
	const navigate = useNavigate();
	const onClickBook = () => {
		navigate("/bookViewer/" + props.id);
	};
	return (
		<div
			className="d-flex flex-column align-items-center"
			style={{ width: "fit-content", cursor: "pointer" }}
			onClick={onClickBook}
		>
			<img src={props.cover} alt="" style={{ width: "120px" }} />
			<span
				className="d-inline-block text-truncate"
				style={{ maxWidth: "120px" }}
			>
				{props.bookName}
			</span>
		</div>
	);
}
Index.Container = Container;
function Container(props) {
	return (
		<div className="d-flex flex-wrap" style={{ gap: "10px" }}>
			{props.children}
		</div>
	);
}
