import BookChapters from "@/components/BookChapters";
import { Tab, Nav, Row, Col, Navbar, Container } from "react-bootstrap";
import Nothing from "@/components/Nothing";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePersistFn } from "@/utils/useFunc";
import ReadingSetting from "@/components/ReadingSetting";

function getClickPosition(e) {
	let position = "";
	let allWidth = document.body.clientWidth;
	let x = e.clientX;
	if (x < allWidth / 3) {
		position = "left";
	} else if (x >= allWidth / 3 && x < (allWidth / 3) * 2) {
		position = "center";
	} else {
		position = "right";
	}
	return position;
}
export default function Index(props) {
	let [show, set_show] = useState(false);
	const cb = usePersistFn((e) => {
		let p = getClickPosition(e);
		if (show) {
			set_show(false);
		} else {
			set_show(p === "center");
		}
		if (p === "left") {
			props.bookShowPromise.then((bookShow) => {
				bookShow.rendition.prev();
			});
		} else if (p === "right") {
			props.bookShowPromise.then((bookShow) => {
				bookShow.rendition.next();
			});
		}
	});
	
	useEffect(() => {
		props.bookShowPromise.then((bookShow) => {
			bookShow.rendition.on("rendered", () => {
				let iframeList =
					rendition.manager.container.getElementsByTagName("iframe");
				iframeList = Array.from(iframeList);
				iframeList.forEach((iframe) => {
					iframe.contentDocument.addEventListener("click", cb);
				});
			});
			bookShow.rendition.on("markClicked", (cfirange, data, content) => {
				console.log(cfirange, data, content);
			});
		});
	}, []);
	if (!show) return null;
	return (
		<>
			<TopMenu bookShowPromise={props.bookShowPromise}></TopMenu>
			{props.children}
			<BottomMenu bookShowPromise={props.bookShowPromise}></BottomMenu>
		</>
	);
}
function TopMenu(props) {
	const navigate = useNavigate();
	return (
		<div
			className="position-absolute top-0 w-100 d-grid grid-cols-3"
			style={{ height: "fit-content", zIndex: 1, borderRadius: "10px" }}
		>
			<Navbar bg="light">
				<Container>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link eventKey="返回" onClick={(e) => navigate("/")}>
								返回
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}


function BottomMenu(props) {
	const [key, setKey] = useState("");
	return (
		<div
			className="position-absolute bottom-0 w-100 d-grid grid-cols-3"
			style={{ height: "fit-content", zIndex: 1, borderRadius: "10px" }}
		>
			<Tab.Container
				defaultActiveKey=""
				activeKey={key}
				onSelect={(k) => {
					if (k === key) {
						setKey("");
					} else {
						setKey(k);
					}
				}}
			>
				<Row>
					<Tab.Content style={{ paddingLeft: "0", paddingRight: "0" }}>
						<Tab.Pane eventKey="目录">
							<BookChapters bookShowPromise={props.bookShowPromise}></BookChapters>
						</Tab.Pane>
						<Tab.Pane eventKey="笔记">
							<Nothing />
						</Tab.Pane>
						<Tab.Pane eventKey="背景颜色">
							<Nothing />
						</Tab.Pane>
						<Tab.Pane eventKey="阅读设置">
							<ReadingSetting></ReadingSetting>
						</Tab.Pane>
					</Tab.Content>
				</Row>
				<Row className="mt-2">
					<Nav
						variant="pills"
						className="d-flex justify-content-around bg-light py-2"
					>
						<Nav.Item>
							<Nav.Link eventKey="目录">目录</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="笔记">笔记</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="背景颜色">背景颜色</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="阅读设置">阅读设置</Nav.Link>
						</Nav.Item>
					</Nav>
				</Row>
			</Tab.Container>
		</div>
	);
}
