import MyHeader from "@/components/Header";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";

export default function Index(props) {
	const handleInput = (e) => {
		props.onChange(Array.from(e.target.files));
	};
	const [onHoverClass, set_onHoverClass] = useState("");
	const handleDragOver = (e) => {
		set_onHoverClass("border-success");
	};
	const handleDrag = (e) => {
		handleDragEnd(); // 去掉界面反馈
		e.preventDefault(); // 避免浏览器默认打开拖动的文件的操作
		let files = e.dataTransfer.files;
		console.log(files);
		props.onChange(Array.from(files));
	};
	const handleDragEnd = (e) => {
		set_onHoverClass("");
	};
	return (
		<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			<div className="px-4 py-6 sm:px-0">
				<div
					className={
						"h-96 rounded-lg border-4 border-dashed border-gray-200 relative " +
						onHoverClass
					}
					onDrop={handleDrag}
					onDragOver={handleDragOver}
					onDragLeave={handleDragEnd}
					onDragEnd={handleDragEnd}
				>
					<div
						className="absolute xs:w-4/5"
						style={{
							left: "50%",
							top: "50%",
							transform: "translate(-50%,-50%)",
							textAlign: "center",
						}}
					>
						<h5>拖动文件到此处 或 点击选择文件</h5>
						<p>支持epub格式，上传完成后可在【书架】中查看</p>
					</div>
					<input
						style={{
							opacity: "0",
							position: "absolute",
							left: "0px",
							right: "0px",
							top: "0px",
							bottom: "0px",
							cursor: "pointer",
						}}
						accept=".epub"
						type="file"
						onChange={handleInput}
					></input>
				</div>
			</div>
			{/* /End replace */}
		</div>
	);
}
