import BookRender from "@/components/BookRender/BookRender";
import BookRenderToolbar from "@/components/BookRender/BookRenderToolbar";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getDefer } from "@/utils";
import BookChapters2Menu from "@/components/BookChapters2Menu";
export default function Index(props) {
	let params = useParams();
	let bookId = params.bookId;
	let [bookShowDefer] = useState(getDefer());
	const onRender = (bookShow) => {
		bookShowDefer.resolve(bookShow);
	};
	const prev = () => {
		be.prev();
	};
	const next = () => {
		be.next();
	};
	return (
		<div className="bg-gray-100 h-fit pt-5">
			<BookRenderToolbar></BookRenderToolbar>
			<div
				className="md:w-2/5 w-4/5 mx-auto p-8 bg-white"
				style={{ minHeight: "97vh" }}
			>
				<BookChapters2Menu></BookChapters2Menu>
				<BookRender
					onRender={onRender}
					bookId={bookId}
					type={"上下滚动"}
				></BookRender>
				<div className="flex w-full justify-around pt-6 mt-12 border-t border-gray-200">
					<button
						onClick={prev}
						type="button"
						class="inline-block px-24 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
					>
						上一章
					</button>
					<button
						onClick={next}
						type="button"
						class="inline-block px-24 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
					>
						下一章
					</button>
				</div>
			</div>
		</div>
	);
}
