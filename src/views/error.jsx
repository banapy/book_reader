import { useRouteError } from "react-router-dom";
import { Alert, Col, Row } from "react-bootstrap";
import Layout from "@/components/Layout";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<Layout>
			<Row>
				<Col sm={7} style={{ margin: "auto" }}>
					<div>
						<h1>😨</h1>
						<p class="text-muted">抱歉,出现了个错误。</p>
						<Alert key="danger" variant="danger">
							<p>
								<strong>
									<i>{error.statusText || error.message}</i>
								</strong>
							</p>
						</Alert>
					</div>
				</Col>
			</Row>
		</Layout>
	);
}
