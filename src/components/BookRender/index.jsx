import { useEffect, useRef, useState } from "react";
import Style from "./index.module.scss";
import { loadScript } from "@/utils/index";
export default function Index(props) {
	const ref = useRef();
	useEffect(() => {
		let book = ePub(props.url);
		let rendition = book.renderTo(ref.current, {
			width: "100%",
			height: "100%",
		});
		rendition.display();
		return () => {
			book.destroy();
		};
	}, []);
	return <div style={{ height: "100vh" }} ref={ref} id="book-viewer"></div>;
}
