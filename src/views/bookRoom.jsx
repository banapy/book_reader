import { Suspense, useEffect, useRef, useState } from "react";
import BookCard from "@/components/BookCard";
import { authAtom } from "@/atoms";
import { axios } from "@/api";
import Layout from "@/components/Layout";

export default function Index(props) {
	const [bookList, set_bookList] = useState([]);
	const [auth] = useRecoilState(authAtom);
	useEffect(() => {
		be.initDefer.promise.then((res) => {
			const changed = () => {
				const bookList = be.getBookList();
				set_bookList(bookList);
			};
			changed();
			be.on("addBook", changed);
			be.on("removeBook", changed);
			be.on("bookChanged", changed);
		});
	}, []);
	let mainPage = (
		<Layout>
			<div className="mt-3">
				<BookCard.Container>
					{bookList.map((x) => {
						return (
							<BookCard
								cover={x.metaData.cover}
								bookName={x.metaData.name}
								id={x.id}
								isFavorite={x.isFavorite}
							></BookCard>
						);
					})}
				</BookCard.Container>
			</div>
		</Layout>
	);

	return <>{mainPage}</>;
}
function ImportBook(props) {
	const startImport = () => {
		setShow(true);
	};
	const [auth] = useRecoilState(authAtom);
	const onSubmit = async (formData) => {
		console.log(formData);
		let file = formData.get("file");
		let fileId;
		if (file) {
			const res = await axios.post("/api/static/files", formData);
			if (res.code === 0) {
				fileId = res.data;
			}
		}
		const res = await axios.post("/api/bookRoom/userInfo", {
			uid: auth.uid,
			bookProxy: {
				fileId: fileId,
				fileType: "文件",
				fileUrl: formData.get("fileUrl"),
				fileName: formData.get("fileName"),
			},
		});
		if (res.code === 0) {
			console.log("上传成功");
		}
	};
	const [show, setShow] = useState(false);
	return (
		<>
			<Button variant="light" onClick={startImport}>
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
import { useRecoilState } from "recoil";
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
				<iframe
					id="iframeDisplay"
					name="iframe_display"
					style={{ display: "none" }}
				></iframe>
				<Form ref={form} target="iframeDisplay">
					<Form.Group className="mb-3" controlId="form.fileName">
						<Form.Label>书名</Form.Label>
						<Form.Control
							type="text"
							placeholder="三国演义"
							name="fileName"
							autoFocus
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label>类型</Form.Label>
						<Form.Select
							aria-label="类型"
							name="fileType"
							required
							onChange={onTypeChange}
						>
							<option value="文件">文件</option>
							<option value="链接">链接</option>
						</Form.Select>
					</Form.Group>
					{importType === "文件" ? (
						<Form.Group className="mb-3" controlId="form.fileType">
							<Form.Label>文件</Form.Label>
							<Form.Control type="file" name="file" required />
						</Form.Group>
					) : (
						<Form.Group className="mb-3" controlId="form.fileUrl">
							<Form.Label>URL</Form.Label>
							<Form.Control
								name="fileUrl"
								type="text"
								placeholder="https://xxx.com/xxx.epub"
								required
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
