import Register from "@/components/Register";
import MyHeader from "@/components/Header";
import Layout from "@/components/Layout";

import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
export const getServerSideProps = async (ctx) => {
	return {
		props: {},
	};
};

export default function Index() {
	const navigator = useNavigate();
	return (
		<Layout>
			<Row>
				<Col sm={7} style={{ margin: "auto" }}>
					<Register></Register>
				</Col>
			</Row>
		</Layout>
	);
}
