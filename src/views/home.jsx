import { Suspense, useEffect, useRef, useState } from "react";
import MyHeader from "@/components/Header";
export default function Index(props) {
	const [curState, setCurState] = useState("书架");
	const navigate = useNavigate();
	const bookProxyList = [
		{
			id: 0,
			type: "链接",
			info: {
				url: "https://react-reader.metabits.no/files/alice.epub",
				cover: "http://img3m9.ddimg.cn/26/10/27669239-1_w_1.jpg",
				bookName: "alice",
			},
		},
		{
			id: 1,
			type: "链接",
			info: {
				url: "https://s3.amazonaws.com/moby-dick/moby-dick.epub",
				cover: "http://img3m5.ddimg.cn/74/8/1137309005-1_w_1.jpg",
				bookName: "moby-dick",
			},
		},
	];
	const onClickBook = (bookProxy) => {
		navigate("/bookViewer/" + bookProxy.id);
	};
	let mainPage = (
		<Container>
			<MyHeader></MyHeader>
			<div className="my-2">
				<ImportBook></ImportBook>
			</div>
			<div>
				<ListGroup variant="flush">
					{bookProxyList.map((x) => {
						return (
							<ListGroup.Item key={x.id} onClick={(e) => onClickBook(x)}>
								<div className="d-flex align-items-center">
									<img
										src={x.info.cover}
										alt=""
										className=""
										style={{ width: "20vw" }}
									/>
									<div className="h-100">
										<h6>{x.info.bookName}</h6>
									</div>
								</div>
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</div>
		</Container>
	);

	return <>{mainPage}</>;
}
function ImportBook(props) {
	const startImport = () => {
		setShow(true);
	};
	const onSubmit = (formData) => {
		console.log(formData);
	};
	const [show, setShow] = useState(false);
	return (
		<>
			<Button variant="light" size="sm" onClick={startImport}>
				导入
			</Button>
			<ImportBookModal
				show={show}
				submit={onSubmit}
				onHide={() => setShow(false)}
			></ImportBookModal>
		</>
	);
}
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container, ListGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function ImportBookModal(props) {
	const form = useRef();
	const onEnterd = () => {
		form.current.onsubmit = function (e) {
			let formData = new FormData(e.target);
			props.submit(formData);
		};
	};
	const [importType, set_importType] = useState("文件");
	const onTypeChange = (e) => {
		set_importType(e.target.value);
	};
	return (
		<Modal
			show={props.show}
			centered
			onEntered={onEnterd}
			onHide={props.onHide}
		>
			<Modal.Header closeButton>
				<Modal.Title>导入书籍</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form ref={form}>
					<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
						<Form.Label>书名</Form.Label>
						<Form.Control type="text" placeholder="三国演义" autoFocus />
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label>类型</Form.Label>
						<Form.Select aria-label="类型" onChange={onTypeChange}>
							<option value="文件">文件</option>
							<option value="链接">链接</option>
						</Form.Select>
					</Form.Group>
					{importType === "文件" ? (
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>文件</Form.Label>
							<Form.Control type="file" />
						</Form.Group>
					) : (
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>URL</Form.Label>
							<Form.Control
								type="text"
								placeholder="https://xxx.com/xxx.epub"
								autoFocus
							/>
						</Form.Group>
					)}
					<Modal.Footer>
						<Button variant="secondary" onClick={props.onHide}>
							取消
						</Button>
						<Button variant="primary" type="submit">
							提交
						</Button>
					</Modal.Footer>
				</Form>
			</Modal.Body>
		</Modal>
	);
}