import {
	Button,
	Col,
	FloatingLabel,
	Form,
	Image,
	ListGroup,
	Row,
} from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

export default function Index(props) {
	const [messageList, set_messageList] = useState([
		{
			avatar: "https://imyshare.com/media/user/head12.jpg",
			content: "sfsfsf",
			time: "2022-11-10 10:11:11",
			name: "nickName",
		},
		{
			avatar: "https://imyshare.com/media/user/head12.jpg",
			content: "sfsfsf",
			time: "2022-11-10 10:11:11",
			name: "nickName",
		},
		{
			avatar: "https://imyshare.com/media/user/head12.jpg",
			content: "sfsfsf",
			time: "2022-11-10 10:11:11",
			name: "nickName",
		},
	]);
	const form = useRef();
	useEffect(() => {}, []);
	const submit = () => {
		let formData = new FormData(form.current);
		console.log(formData);
	};
	return (
		<>
			<Form ref={form} target="iframeDisplay2" className="mb-3">
				<Row className="align-items-center gap-3">
					<FloatingLabel
						as={Col}
						md={10}
						controlId="floatingTextarea2"
						label="留言"
					>
						<Form.Control
							as="textarea"
							placeholder="留下一个评论"
							style={{ height: "80px" }}
							name="message"
						/>
					</FloatingLabel>
					<Form.Group as={Col} controlId="validationCustom01">
						<Form.Label></Form.Label>
						<Button variant="primary" onClick={submit}>
							提交
						</Button>
					</Form.Group>
				</Row>
			</Form>
			<ListGroup variant="flush">
				{messageList.map((message) => {
					return (
						<ListGroup.Item>
							<MessageItem data={message}></MessageItem>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
		</>
	);
}

function MessageItem(props) {
	return (
		<div className="d-flex w-100">
			<Image src={props.data.avatar} className="me-3" roundedCircle></Image>
			<div className="d-flex flex-column w-100">
				<div className="d-flex justify-content-between w-100">
					<div className="d-flex align-items-center">
						<span className="d-inline-block me-3">{props.data.name}</span>
						<span className="d-inline-block">{props.data.time}</span>
					</div>
					<Button variant="link">回复</Button>
				</div>
				<div>{props.data.content}</div>
			</div>
		</div>
	);
}
