import React, { useRef, useState } from 'react'
import {
	AutoComplete,
	Button,
	Cascader,
	Checkbox,
	Col,
	Form,
	Input,
	InputNumber,
	message,
	Row,
	Select,
} from 'antd'
import { axios } from '@/api'
import { usePersistFn } from '@/utils/useFunc'
const { Option } = Select
const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 4,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
}
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
}
let WAITING_SECONDS = 60

export default function Index(props) {
	const [sendCodeSeconds, set_sendCodeSeconds] = useState(0)
	const [form] = Form.useForm()
	const onFinish = values => {
		console.log('Received values of form: ', values)
		let formData = new FormData()
		formData.append('mail', values.email)
		formData.append('code', values.code)
		formData.append('password', values.password)
		formData.append('name', values.nickname)
		formData.append('phone', values.phone)
		axios
			.post('/register', formData)
			.then(res => {
				console.log(res)
				if (res.code === 0) {
					let token = res.data.token
					message.success('注册成功')
					props.onRegisted()
				}
			})
			.catch(e => {
				console.error(e)
			})
	}
	const handler = useRef()
	const cb = usePersistFn(() => {
		set_sendCodeSeconds(sendCodeSeconds - 1)
		if (sendCodeSeconds === 0) {
			clearInterval(handler.current)
			set_sendCodeSeconds(0)
		}
	})
	const sendCode = () => {
		let email = form.getFieldValue('email')
		if (!email) {
			return
		}
		let formData = new FormData()
		formData.append('email', email)
		axios.post('/send-code', formData).then(res => {
			set_sendCodeSeconds(WAITING_SECONDS)
			handler.current = setInterval(cb, 1000)
		})
	}
	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select
				style={{
					width: 70,
				}}
			>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		</Form.Item>
	)
	return (
		<Form
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={onFinish}
			initialValues={{
				prefix: '86',
			}}
			scrollToFirstError
		>
			<Form.Item
				name="email"
				label="邮箱"
				rules={[
					{
						type: 'email',
						message: '邮箱地址不合法!',
					},
					{
						required: true,
						message: '请输入邮箱!',
					},
				]}
			>
				<div style={{ display: 'flex' }}>
					<Input />
					<Button
						type="primary"
						onClick={sendCode}
						disabled={sendCodeSeconds !== 0}
					>
						{sendCodeSeconds !== 0 ? `已发送,${sendCodeSeconds}` : '发送'}
					</Button>
				</div>
			</Form.Item>

			<Form.Item
				name="code"
				label="验证码"
				rules={[
					{
						required: true,
						message: '请输入验证码!',
					},
				]}
				hasFeedback
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="password"
				label="密码"
				rules={[
					{
						required: true,
						message: '请输入密码!',
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="确认密码"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: '请确认密码!',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve()
							}
							return Promise.reject(
								new Error('The two passwords that you entered do not match!')
							)
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="nickname"
				label="昵称"
				tooltip="你想让人们怎么称呼你?"
				rules={[
					{
						required: true,
						message: '请输入昵称!',
						whitespace: true,
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="phone"
				label="手机号"
				rules={[
					{
						required: false,
						message: '请输入手机号!',
					},
				]}
			>
				<Input
					addonBefore={prefixSelector}
					style={{
						width: '100%',
					}}
				/>
			</Form.Item>
			<Form.Item
				name="agreement"
				valuePropName="checked"
				rules={[
					{
						validator: (_, value) =>
							value
								? Promise.resolve()
								: Promise.reject(new Error('Should accept agreement')),
					},
				]}
				{...tailFormItemLayout}
			>
				<Checkbox>
					已读 <a href="">agreement</a>
				</Checkbox>
			</Form.Item>
			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit">
					注册
				</Button>
			</Form.Item>
		</Form>
	)
}
