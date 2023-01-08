import { useEffect, useRef, useState } from "react";
import HighLight from "@/components/HighLight";
export default function Index(props) {
	const ref = useRef();
	useEffect(() => {
		be.initDefer.promise.then(() => {
			be.renderBook(props.bookId, "book-viewer");
		});
		return () => {
			be.cancelRender();
		};
	}, []);
	return (
		<>
			<div
				style={{ zIndex: 0 }}
				ref={ref}
				id="book-viewer"
				className="w-full m-auto"
			></div>
			<HighLight></HighLight>
		</>
	);
}
