import BookRender from "@/components/BookRender/BookRender";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDefer } from "@/utils";
import BookViewerMenu from "@/components/BookViewerMenu/BookViewerMenu";
export default function Index(props) {
	let params = useParams();
	const [url, set_url] = useState(
		"https://react-reader.metabits.no/files/alice.epub"
	);
	let bookId = params.bookId;
	let [renderDefer] = useState(getDefer());
	useEffect(() => {
		axios.get("/api/bookRoom/book/" + bookId).then((res) => {
			if (res.data.code === 0) {
				console.log(res.data.data);
			}
		});
	}, []);
	const onRender = (_renderRes) => {
		renderDefer.resolve(_renderRes);
	};
	return (
		<Container className="position-relative">
			<BookViewerMenu renderDefer={renderDefer}></BookViewerMenu>
			<BookRender onRender={onRender} url={url}></BookRender>
		</Container>
	);
}
