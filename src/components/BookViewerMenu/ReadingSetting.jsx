import { Card, Form } from "react-bootstrap";
export default function Index(props) {
	const onChange = () => {};
	return (
		<Card style={{ width: "100%" }} bg="light" border="light">
			<Card.Body>
				<Form.Select onChange={onChange} value={"左右翻页"}>
					<option value={"左右翻页"}>左右翻页</option>
					<option value={"上下滚动"}>上下滚动</option>
				</Form.Select>
			</Card.Body>
		</Card>
	);
}
