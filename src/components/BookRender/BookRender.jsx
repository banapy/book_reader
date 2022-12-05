import { useEffect, useRef, useState } from "react";
import Style from "./BookRender.module.scss";
import { loadScript } from "@/utils/index";
export default function Index(props) {
	const ref = useRef();
	useEffect(() => {
		let book = ePub(props.url);
		let rendition = book.renderTo(ref.current, {
			width: "100%",
			height: "100%",
			manager: "continuous",
			flow: "scrolled",
		});
		let op = { book, rendition }
		console.log(op)
		props.onRender && props.onRender(op);
		rendition.display();

		book.ready.then(() => {
			var keyListener = function (e) {
				// Left Key
				if ((e.keyCode || e.which) == 37) {
					book.package.metadata.direction === "rtl"
						? rendition.next()
						: rendition.prev();
				}
				if ((e.keyCode || e.which) == 39) {
					book.package.metadata.direction === "rtl"
						? rendition.prev()
						: rendition.next();
				}
			};
			rendition.on("keyup", keyListener);
			document.addEventListener("keyup", keyListener, false);
		});
		return () => {
			book.destroy();
		};
	}, []);
	return (
		<div
			style={{ height: "100vh", width: "100%", margin: "auto" ,zIndex:0}}
			ref={ref}
			id="book-viewer"
		></div>
	);
}
