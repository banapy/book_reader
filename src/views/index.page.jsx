import { Suspense, useEffect, useRef, useState } from "react";
import Book from "@/components/Book";
import MyHeader from "@/components/Header";
export default function Index(props) {
	const [curState, setCurState] = useState("书架");
	const [browser, setBrowser] = useState(false);
	useEffect(() => {
		setBrowser(true);
	}, []);
	const bookProxyList = [
		{
			id: 0,
			type: "链接",
			info: {
				url: "https://react-reader.metabits.no/files/alice.epub",
				bookName: "alice",
			},
		},
		{
			id: 1,
			type: "链接",
			info: {
				url: "https://s3.amazonaws.com/moby-dick/moby-dick.epub",
				bookName: "moby-dick",
			},
		},
	];
	let mainPage;
	if (curState === "书架") {
		mainPage = (
			<div className="container-sm">
				<MyHeader></MyHeader>
				<div>
					<ImportBook></ImportBook>
				</div>
				<div>
					<ul className="list-group">
						{bookProxyList.map((x) => {
							return (
								<li
									key={x.id}
									className="list-group-item d-flex justify-content-between align-items-center"
									onClick={(e) => setCurState("读书")}
								>
									{x.info.bookName}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	} else if (curState == "读书") {
		// mainPage = <BookViewer bookProxy={bookProxy}></BookViewer>;
	}

	return <>{mainPage}</>;
}
export function BookViewer(props) {
	return (
		<>
			<Book proxy={props.bookProxy}></Book>
		</>
	);
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
			<Button variant="primary" onClick={startImport}>
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
			onEntered={onEnterd}
			onHide={props.onHide}
			size="sm"
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
