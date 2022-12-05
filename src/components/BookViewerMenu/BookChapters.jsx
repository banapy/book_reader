import { Button, Card, Container, ListGroup, Offcanvas } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

export default function Chapters(props) {
	const { renderDefer } = props;
	let [chapters, set_chapters] = useState([]);
	const [title, set_title] = useState("");
	const goChapter = (chapter) => {
		renderDefer.promise.then(({ rendition }) => {
			rendition.display(chapter.href);
		});
	};
	useEffect(() => {
		renderDefer.promise.then((renderRes) => {
			renderRes.book.loaded.navigation.then(function (res) {
				const toc = res.toc;
				set_chapters(toc);
			});
			renderRes.book.loaded.metadata.then(function (metadata) {
				set_title(metadata.title);
			});
		});
	}, []);
	return (
		<Card style={{ width: "100%" }} bg="light" border="light">
			<Card.Body>
				<Card.Title>{title ? title : "目录"}</Card.Title>
				<ListGroup variant="flush">
					{chapters.map((chapter) => {
						return (
							<ListGroup.Item
								variant="light"
								key={chapter.id}
								onClick={(e) => goChapter(chapter)}
								style={{ cursor: "pointer" }}
							>
								{chapter.label}
							</ListGroup.Item>
						);
					})}
				</ListGroup>
			</Card.Body>
		</Card>
	);
}
