import MyHeader from "@/components/Header";
import { Container } from "react-bootstrap";

export default function Index(props) {
	return (
		<div
			style={{
				paddingTop: "100px",
			}}
		>
			<MyHeader></MyHeader>
			<Container>{props.children}</Container>
		</div>
	);
}
