import BookRender from "@/components/BookRender/BookRender";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDefer } from "@/utils";

import MobileBookViewerMenu from "@/components/MobileBookViewerMenu/MobileBookViewerMenu";
import WebBookViewerMenu from "@/components/WebBookViewerMenu/WebBookViewerMenu";
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
			{isMobile ? (
				<MobileBookViewerMenu renderDefer={renderDefer}>
					<BookRender
						onRender={onRender}
						url={url}
						type={"左右翻页"}
					></BookRender>
				</MobileBookViewerMenu>
			) : (
				<WebBookViewerMenu renderDefer={renderDefer}>
					<BookRender
						onRender={onRender}
						url={url}
						type={"上下滚动"}
					></BookRender>
				</WebBookViewerMenu>
			)}
		</Container>
	);
}
