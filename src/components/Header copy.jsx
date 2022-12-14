import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom } from "@/atoms";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

export default function MyHeader(props) {
	const auth = useRecoilValue(authAtom);
	return (
		<Navbar bg="primary" expand="lg" className="mb-3 fixed-top navbar-dark">
			<Container fluid>
				<Navbar.Brand href="/#/">
					{auth.userInfo ? auth.userInfo.bookRoomName : "书斋"}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="/#/uploadBook">导入</Nav.Link>
						<Nav.Link href="/#/about">关于</Nav.Link>
						<Nav.Link href="/#/message">留言</Nav.Link>
						<Nav.Link href="https://github.com/banapy/book_reader">github</Nav.Link>
					</Nav>
					<Form className="d-flex">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px", width: "100%" }}
							navbarScroll
						>
							{auth.isLogin ? (
								<>
									<Nav.Link href="/#/account">账号</Nav.Link>
									<Nav.Link href="/#/setting">设置</Nav.Link>
								</>
							) : (
								<>
									<Nav.Link href="/#/login">登录</Nav.Link>
									<Nav.Link href="/#/register">注册</Nav.Link>
								</>
							)}
						</Nav>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
