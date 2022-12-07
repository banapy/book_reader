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
import { axios } from "@/api";
import { authAtom } from "@/atoms";
import { useRecoilState } from "recoil";
export default function Index(props) {
	const [auth] = useRecoilState(authAtom);

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
	const initMessageList = () => {
		axios
			.get("/api/replies/app/bookRoom", {
				pageSize: 10,
				pageNo: 1,
			})
			.then((res) => {
				if (res.data.code === 0) {
					if (res.data.data) {
						set_messageList(res.data.data);
					}
				}
			});
	};
	useEffect(() => {
		initMessageList();
	}, []);
	const submit = () => {
		let formData = new FormData(form.current);
		console.log(formData);
		const content = formData.get("message");
		if (!content) return;
		axios
			.post("/api/replies/app", {
				appId: "bookRoom",
				content: content,
				userId: auth.uid,
				type: "留言",
			})
			.then((res) => {
				if (res.data.code === 0) {
					initMessageList();
				}
			});
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
						<span className="d-inline-block me-3">{props.data.userName}</span>
						<span className="d-inline-block">
							{dayjs(props.data.CreatedAt).format("YYYY-MM-DD hh-mm-ss")}
						</span>
					</div>
					<Button variant="link">回复</Button>
				</div>
				<div>{props.data.content}</div>
			</div>
		</div>
	);
}
