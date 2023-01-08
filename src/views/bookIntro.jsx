import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDefer } from "@/utils";
import Layout from "@/components/Layout";
export default function Index(props) {
	let params = useParams();
	let bookId = params.bookId;
	const [curBook, set_curBook] = useState(null);
	let [bookShowDefer] = useState(getDefer());
	useEffect(() => {
		be.initDefer.promise.then((res) => {
			const book = be.getBook(bookId);
			set_curBook(book);
		});
	}, []);
	const navigate = useNavigate();
	const onClickBook = () => {
		navigate("/bookViewer/" + bookId);
	};
	return (
		<Layout>
			{curBook ? (
				<div>
					<div className="flex">
						<img
							src={curBook.metaData.cover}
							alt="cover"
							className="mr-3"
							style={{ width: "120px" }}
						/>
						<div className="grid grid-cols-6 h-auto">
							<div className="col-span-1">书名:</div>
							<div className="col-span-5">{curBook.metaData.name}</div>
							<div className="col-span-1">作者:</div>
							<div className="col-span-5">{curBook.metaData.author}</div>
							<div className="col-span-1">出版社:</div>
							<div className="col-span-5">{curBook.metaData.publisher}</div>
							<div className="col-span-1">大小:</div>
							<div className="col-span-5">{curBook.metaData.size}</div>
							<div className="col-span-1">格式:</div>
							<div className="col-span-5">{curBook.metaData.format}</div>
						</div>
					</div>
					<div class="flex space-x-2 justify-center">
						<button
							type="button"
							onClick={onClickBook}
							class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						>
							阅读
						</button>
					</div>
					{curBook.metaData.description ? (
						<div>
							描述
							<section class="text-gray-600 body-font">
								<div class="container px-5 py-24 mx-auto">
									<div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											class="inline-block w-8 h-8 text-gray-400 mb-8"
											viewBox="0 0 975.036 975.036"
										>
											<path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
										</svg>
										<p class="leading-relaxed text-lg">
											{curBook.metaData.description}
										</p>
										<span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
										<h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">
											HOLDEN CAULFIELD
										</h2>
										<p class="text-gray-500">Senior Product Designer</p>
									</div>
								</div>
							</section>
						</div>
					) : undefined}
					<div>
						<h1>章节</h1>
					</div>
				</div>
			) : null}
		</Layout>
	);
}
