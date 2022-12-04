import BookRender from "@/components/BookRender/index";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Index(props) {
	let params = useParams();
	const [url, set_url] = useState("https://react-reader.metabits.no/files/alice.epub");
	let bookId = params.bookId;
	useEffect(() => {
		axios.get("/auth/bookRoom/book/" + bookId).then((res) => {
			if (res.data.code === 0) {
				console.log(res.data.data);
			}
		});
	}, []);
	// const url = "https://react-reader.metabits.no/files/alice.epub";
	return <BookRender url={url}></BookRender>;
}
