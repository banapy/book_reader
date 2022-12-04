import BookRender from "@/components/BookRender/index";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
export default function Index(props) {
	let params = useParams();
	const [url, set_url] = useState(
		"https://react-reader.metabits.no/files/alice.epub"
	);
	let bookId = params.bookId;
	useEffect(() => {
		axios.get("/auth/bookRoom/book/" + bookId).then((res) => {
			if (res.data.code === 0) {
				console.log(res.data.data);
			}
		});
	}, []);
	let [chapters, set_chapters] = useState([]);
	const renderRes = useRef();
	const onRender = (_renderRes) => {
		renderRes.current = _renderRes;
		const { book, rendition } = _renderRes;
		book.loaded.navigation.then(function (res) {
			const toc = res.toc;
			set_chapters(toc);
		});
	};
	const goChapter = (chapter) => {
		console.log(chapter);
		renderRes.current.rendition.display(chapter.href);
	};
	console.log("chapters");
	console.log(chapters);
	return (
		<Container>
			<ListGroup>
				{chapters.map((chapter) => {
					return (
						<ListGroup.Item onClick={(e) => goChapter(chapter)}>
							{chapter.label}
						</ListGroup.Item>
					);
				})}
			</ListGroup>
			<BookRender onRender={onRender} url={url}></BookRender>
		</Container>
	);
}
