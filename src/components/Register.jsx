import React, { useRef, useState } from "react";
import { axios } from "@/api";
import { usePersistFn } from "@/utils/useFunc";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
let WAITING_SECONDS = 60;

export default function Index(props) {
	const navigate = useNavigate();
	const [sendCodeSeconds, set_sendCodeSeconds] = useState(0);
	const form = useRef();
	const onFinish = () => {
		let formData = new FormData(form.current);
		axios
			.post("/register", formData)
			.then((res) => {
				console.log(res);
				if (res.code === 0) {
					let token = res.data.token;
					console.log("注册成功");
					navigate("/");
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};
	const handler = useRef();
	const cb = usePersistFn(() => {
		set_sendCodeSeconds(sendCodeSeconds - 1);
		if (sendCodeSeconds === 0) {
			clearInterval(handler.current);
			set_sendCodeSeconds(0);
		}
	});
	const sendCode = () => {
		axios.post("/send-code", new FormData(form.current)).then((res) => {
			set_sendCodeSeconds(WAITING_SECONDS);
			handler.current = setInterval(cb, 1000);
		});
	};
	return (
		<Form ref={form}>
			<Row>
				<Col sm={9}>
					<Form.Floating className="mb-3">
						<Form.Control
							id="register-email"
							type="email"
							name="email"
							required
							placeholder="name@example.com"
						/>

						<label htmlFor="register-email">邮箱</label>
					</Form.Floating>
				</Col>
				<Col sm={3}>
					<div>
						<Button
							type="primary"
							onClick={sendCode}
							disabled={sendCodeSeconds !== 0}
						>
							{sendCodeSeconds !== 0 ? `已发送,${sendCodeSeconds}` : "发送"}
						</Button>
					</div>
				</Col>
			</Row>

			<Form.Floating className="mb-3">
				<Form.Control id="register-code" placeholder=" " name="code" required />
				<label htmlFor="register-code">验证码</label>
			</Form.Floating>
			<Form.Floating className="mb-3">
				<Form.Control
					id="register-password"
					type="password"
					required
					placeholder=" "
					name="password"
				/>
				<label htmlFor="register-password">密码</label>
			</Form.Floating>
			<Form.Floating className="mb-3">
				<Form.Control
					id="register-confirm-password"
					type="password"
					required
					name="confirm"
					placeholder=" "
				/>
				<label htmlFor="register-confirm-password">确认密码</label>
			</Form.Floating>
			<Form.Floating className="mb-3">
				<Form.Control
					id="register-nickName"
					placeholder=" "
					name="name"
					required
				/>
				<label htmlFor="register-nickName">昵称</label>
			</Form.Floating>
			<Form.Floating className="mb-3">
				<Form.Control
					id="register-phone"
					placeholder=" "
					name="phone"
					required
				/>
				<label htmlFor="register-phone">手机号</label>
			</Form.Floating>
			<Form.Group className="mb-3">
				<div className="d-flex align-items-center">
					<Form.Check
						type={"checkbox"}
						id={`default-checkbox`}
						label={`已读`}
						name="agreement"
					/>
					<Button variant="link" onClick={(e) => navigate("/#/agreement")}>
						协议
					</Button>
				</div>
			</Form.Group>
			<Form.Group className="mb-3">
				<Button variant="primary" onClick={onFinish}>
					注册
				</Button>
			</Form.Group>
		</Form>
	);
}
