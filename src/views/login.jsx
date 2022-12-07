import Login from "@/components/Login";
import MyHeader from "@/components/Header";
import { Col, Row } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
export const getServerSideProps = async (ctx) => {
	return {
		props: {},
	};
};

export default function Index() {
	const navigator = useNavigate();
	return (
		<div className="container-sm">
			<MyHeader></MyHeader>
			<Row>
				<Col sm={7} style={{ margin: "auto" }}>
					<Login onLogin={(e) => navigator("/")}></Login>
				</Col>
			</Row>
		</div>
	);
}
