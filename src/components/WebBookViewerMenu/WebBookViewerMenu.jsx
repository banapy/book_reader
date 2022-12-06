import BookChapters from "@/components/BookChapters";
import ReadingSetting from "@/components/ReadingSetting";
import {
	Tab,
	Nav,
	Row,
	Col,
	Navbar,
	Container,
	OverlayTrigger,
	Popover,
} from "react-bootstrap";
import Nothing from "@/components/Nothing";
import { useEffect, useState } from "react";

export default function Index(props) {
	return (
		<Container >
			<Navbar bg="light">
				<Container>
					<Navbar.Brand href="#">书斋</Navbar.Brand>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link eventKey="返回" onClick={(e) => navigate("/")}>
								返回
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div style={{ height: "90vh", width: "80%", margin: "auto" }}>
				{props.children}
			</div>
			<RightMenu renderDefer={props.renderDefer}></RightMenu>
		</Container>
	);
}
function RightMenu(props) {
	const [key, setKey] = useState("");
	return (
		<div
			className="position-absolute d-grid grid-cols-3"
			style={{
				height: "fit-content",
				zIndex: 1,
				borderRadius: "10px",
				position: "fixed",
				top: "20vh",
				right: "0vw",
			}}
		>
			<Nav
				className="d-flex flex-column bg-light py-2"
				style={{ height: "fit-content" }}
			>
				<Nav.Item>
					<OverlayTrigger
						trigger="click"
						placement="left-start"
						overlay={
							<Popover id="popover-basic">
								<Popover.Body style={{ padding: "0px" }}>
									<BookChapters renderDefer={props.renderDefer}></BookChapters>
								</Popover.Body>
							</Popover>
						}
					>
						<Nav.Link eventKey="目录">目录</Nav.Link>
					</OverlayTrigger>
				</Nav.Item>
				<Nav.Item>
					<OverlayTrigger
						trigger="click"
						placement="left-start"
						overlay={
							<Popover id="popover-basic">
								<Popover.Body style={{ padding: "0px" }}>
									<Nothing />
								</Popover.Body>
							</Popover>
						}
					>
						<Nav.Link eventKey="笔记">笔记</Nav.Link>
					</OverlayTrigger>
				</Nav.Item>
				<Nav.Item>
					<OverlayTrigger
						trigger="click"
						placement="left-start"
						overlay={
							<Popover id="popover-basic">
								<Popover.Body style={{ padding: "0px" }}>
									<Nothing />
								</Popover.Body>
							</Popover>
						}
					>
						<Nav.Link eventKey="背景颜色">背景颜色</Nav.Link>
					</OverlayTrigger>
				</Nav.Item>
				<Nav.Item>
					<OverlayTrigger
						trigger="click"
						placement="left-start"
						overlay={
							<Popover id="popover-basic">
								<Popover.Body style={{ padding: "0px" }}>
									<ReadingSetting></ReadingSetting>
								</Popover.Body>
							</Popover>
						}
					>
						<Nav.Link eventKey="阅读设置">阅读设置</Nav.Link>
					</OverlayTrigger>
				</Nav.Item>
			</Nav>
		</div>
	);
}
