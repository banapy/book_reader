import BookRender from "@/components/BookRender/index";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Container, ListGroup, Offcanvas } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDefer } from "@/utils";
export default function Index(props) {
	let params = useParams();
	const [url, set_url] = useState(
		"https://react-reader.metabits.no/files/alice.epub"
	);
	let bookId = params.bookId;
	let [renderDefer] = useState(getDefer());
	useEffect(() => {
		axios.get("/auth/bookRoom/book/" + bookId).then((res) => {
			if (res.data.code === 0) {
				console.log(res.data.data);
			}
		});
	}, []);
	const onRender = (_renderRes) => {
		renderDefer.resolve(_renderRes);
	};
	return (
		<Container>
			<Chapters renderDefer={renderDefer}></Chapters>
			<BookRender onRender={onRender} url={url}></BookRender>
		</Container>
	);
}
function Chapters(props) {
	const { renderDefer } = props;
	let [chapters, set_chapters] = useState([]);
	const [title, set_title] = useState("");
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const goChapter = (chapter) => {
		renderDefer.promise.then(({ rendition }) => {
			rendition.display(chapter.href);
		});
	};
	useEffect(() => {
		renderDefer.promise.then((renderRes) => {
			renderRes.book.loaded.navigation.then(function (res) {
				const toc = res.toc;
				set_chapters(toc);
			});
			renderRes.book.loaded.metadata.then(function (metadata) {
				set_title(metadata.title);
			});
		});
	}, []);
	return (
		<>
			<Button variant="light" onClick={handleShow}>
				目录
			</Button>
			<Offcanvas show={show} onHide={handleClose} scroll backdrop>
				<Offcanvas.Header>
					<Offcanvas.Title>{title ? title : "目录"}</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ListGroup>
						{chapters.map((chapter) => {
							return (
								<ListGroup.Item
									key={chapter.id}
									onClick={(e) => goChapter(chapter)}
									style={{ cursor: "pointer" }}
								>
									{chapter.label}
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
