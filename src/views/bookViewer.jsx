import BookRender from "@/components/BookRender/BookRender";
import BookRenderToolbar from "@/components/BookRender/BookRenderToolbar";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getDefer } from "@/utils";
export default function Index(props) {
	let params = useParams();
	let bookId = params.bookId;
	let [bookShowDefer] = useState(getDefer());
	const onRender = (bookShow) => {
		bookShowDefer.resolve(bookShow);
	};
	return (
		<div className="bg-gray-100 h-fit pt-5">
			<BookRenderToolbar></BookRenderToolbar>
			<div className="md:w-2/5 w-4/5 mx-auto p-8 bg-white" style={{ minHeight: "97vh" }}>
				<BookRender
					onRender={onRender}
					bookId={bookId}
					type={"上下滚动"}
				></BookRender>
			</div>
		</div>
	);
}
