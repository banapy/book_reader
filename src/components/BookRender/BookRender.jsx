import { useEffect, useRef, useState } from "react";
import Style from "./BookRender.module.scss";
import { loadScript } from "@/utils/index";
import BookShow from "./BookShow";
export default function Index(props) {
	const ref = useRef();
	useEffect(() => {
		let bookShow = new BookShow(props.bookId, ref.current);
		props.onRender && props.onRender(bookShow);
		return () => {
			bookShow.destroy();
		};
	}, []);
	return (
		<>
			<div
				style={{ height: "100%", width: "100%", margin: "auto", zIndex: 0 }}
				ref={ref}
				id="book-viewer"
			></div>
		</>
	);
}
