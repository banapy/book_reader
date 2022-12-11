import MyHeader from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { usePersistFn } from "@/utils/useFunc";
import { axios } from "@/api";
import { authAtom } from "@/atoms";
import { useRecoilState } from "recoil";

export default function Index(props) {
	let [percentage, set_percentage] = useState(50);
	const [auth] = useRecoilState(authAtom);
	useEffect(() => {
		const upDate = async () => {
			let formData = new FormData();
			formData.append("file", props.file);
			const res = await axios.post("/api/static/files", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			if (res.code !== 0) {
				return;
			}
			let fileId = res.data;
			const res2 = await axios.post("/api/bookRoom/userInfo", {
				uid: auth.uid,
				bookProxy: {
					fileId: fileId,
				},
			});
			if (res2.data.code !== 0) {
				return;
			}
			set_percentage(100);
		};
		upDate()
	}, []);
	return (
		<div
			className={"position-relative h-100 shadow-sm bg-body rounded  p-3"}
			style={{ boxSizing: "border-box" }}
		>
			{/* <span style={{ zIndex: "2" }}>{props.file.name}</span> */}
			<span className="position-relative" style={{ zIndex: "2" }}>
				lsfsdfsdf
			</span>
			<span
				className="bg-success text-dark bg-opacity-50 rounded"
				style={{
					width: percentage + "%",
					position: "absolute",
					left: "0px",
					right: "0px",
					top: "0px",
					bottom: "0px",
					zIndex: "1",
				}}
			></span>
		</div>
	);
}
