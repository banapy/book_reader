import BookRender from "@/components/BookRender/BookRender";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDefer } from "@/utils";
import HighLight from "@/components/HighLight";
import Layout from "@/components/Layout";

import MobileBookViewerMenu from "@/components/MobileBookViewerMenu/MobileBookViewerMenu";
import WebBookViewerMenu from "@/components/WebBookViewerMenu/WebBookViewerMenu";
export default function Index(props) {
	let params = useParams();
	// const [url, set_url] = useState(
	// 	"https://react-reader.metabits.no/files/alice.epub"
	// );
	let bookId = params.bookId;
	let [bookShowDefer] = useState(getDefer());
	// useEffect(() => {
	// 	axios.get("/api/bookRoom/book/" + bookId).then((res) => {
	// 		if (res.code === 0) {
	// 			console.log(res.data);
	// 		}
	// 	});
	// }, []);
	const onRender = (bookShow) => {
		bookShowDefer.resolve(bookShow);
	};
	return (
		<Layout>
			{isMobile ? (
				<MobileBookViewerMenu bookShowPromise={bookShowDefer.promise}>
					<BookRender
						onRender={onRender}
						// url={url}
						bookId={bookId}
						type={"左右翻页"}
					></BookRender>
				</MobileBookViewerMenu>
			) : (
				<WebBookViewerMenu bookShowPromise={bookShowDefer.promise}>
					<BookRender
						onRender={onRender}
						// url={url}
						bookId={bookId}
						type={"上下滚动"}
					></BookRender>
				</WebBookViewerMenu>
			)}
			<HighLight bookShowPromise={bookShowDefer.promise}></HighLight>
		</Layout>
	);
}
