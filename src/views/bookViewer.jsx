import BookRender from "@/components/BookRender/BookRender";
import BookRenderToolbar from "@/components/BookRender/BookRenderToolbar";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getDefer } from "@/utils";
import BookChapters2Menu from "@/components/BookChapters2Menu";
import Pane from "@/components/Pane";

export default function Index(props) {
	let params = useParams();
	let bookId = params.bookId;
	let [bookShowDefer] = useState(getDefer());
	const [menuShow, set_menuShow] = useState(true);
	const [noteShow, set_noteShow] = useState(false);
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
		<div className="bg-gray-100 h-fit pt-10">
			<BookRenderToolbar
				onMenuShowChange={(e) => set_menuShow(e)}
				onNoteChange={(e) => set_noteShow(e)}
			></BookRenderToolbar>
			<div className="w-full bg-transparent">
				<Pane show={menuShow}>
					<BookChapters2Menu></BookChapters2Menu>
				</Pane>
				<div
					className="md:w-2/5 lg:w-3/5 xs:w-full mx-auto lg:p-8 xs:p-2 bg-white"
					style={{ minHeight: "97vh" }}
				>
					<BookRender
						onRender={onRender}
						bookId={bookId}
						type={"上下滚动"}
					></BookRender>
					<div className="flex w-full justify-around pt-6 mt-12 border-t border-gray-200">
						<button
							onClick={prev}
							type="button"
							class="inline-block lg:px-24 xs:px-3 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
						>
							上一章
						</button>
						<button
							onClick={next}
							type="button"
							class="inline-block lg:px-24 xs:px-3 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
						>
							下一章
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
