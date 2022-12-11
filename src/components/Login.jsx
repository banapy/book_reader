import React, { useContext, useEffect, useRef, useState } from "react";
import { axios } from "@/api";
import { authAtom } from "@/atoms";
import { useRecoilState } from "recoil";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
export default function Index(props) {
	const [auth, set_auth] = useRecoilState(authAtom);
	const navigate = useNavigate();
	const [remeberMe, set_remeberMe] = useState("off");
	const onSubmit = (values) => {
		let params = new FormData();
		params.append("email", formData.email);
		params.append("password", formData.password);
		axios.post("/login", params).then((res) => {
			if (res.code === 0) {
				set_auth({
					...res.data,
					isLogin: true,
				});
				axios
					.get("/api/bookRoom/userInfo", {
						params: {
							uid: res.data.uid,
						},
					})
					.then((res) => {
						if (res.code == 0) {
							set_auth({
								...auth,
								userInfo: res.data,
							});
						}
					});
				props.onLogin && props.onLogin();
			}
		});
	};
	const form = useRef();
	const [formData, set_formData] = useState({
		email: "",
		password: "",
	});
	return (
		<Form ref={form}>
			<Form.Floating className="mb-3">
				<Form.Control
					id="floatingInputEmail"
					type="email"
					required
					placeholder="name@example.com"
					onChange={(e) => set_formData({ ...formData, email: e.target.value })}
				/>
				<label htmlFor="floatingInputEmail">邮箱</label>
			</Form.Floating>
			<Form.Floating className="mb-3">
				<Form.Control
					id="floatingInputPassword"
					type="password"
					required
					placeholder="name@example.com"
					autoComplete={remeberMe}
					onChange={(e) =>
						set_formData({ ...formData, password: e.target.value })
					}
				/>
				<label htmlFor="floatingInputPassword">密码</label>
			</Form.Floating>
			<Form.Group className="mb-3">
				<div className="d-flex align-items-center">
					<Form.Check
						type={"checkbox"}
						id={`default-checkbox`}
						label={`记住密码`}
						onChange={(e) => set_remeberMe(e.target.value)}
					/>
					<Button variant="link" onClick={props.onGoRegister}>
						忘记密码
					</Button>
				</div>
			</Form.Group>
			<Form.Group className="mb-3">
				<Button variant="primary" onClick={onSubmit}>
					登录
				</Button>
				或者
				<Button variant="link" onClick={(e) => navigate("/register")}>
					去注册!
				</Button>
			</Form.Group>
		</Form>
	);
}
