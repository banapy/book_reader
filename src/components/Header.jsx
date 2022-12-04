import { useRecoilState, useRecoilValue } from "recoil";
import { authAtom, userInfoAtom } from "@/atoms";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

export default function MyHeader(props) {
	const auth = useRecoilValue(authAtom);
	const navigate = useNavigate();
	return (
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand href="#">
					{auth.userInfo ? auth.userInfo.bookRoomName : "书斋"}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					></Nav>
					<Form className="d-flex">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							{auth.isLogin ? (
								<>
									<Nav.Link href="#link">账号</Nav.Link>
									<Nav.Link href="#link">设置</Nav.Link>
								</>
							) : (
								<Nav.Link onClick={(e) => navigate("/login")}>登录</Nav.Link>
							)}
						</Nav>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
