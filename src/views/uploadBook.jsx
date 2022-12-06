import MyHeader from "@/components/Header";
import { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import DragUpload from "@/components/DragUpload";
import UploadFileProgress from "@/components/UploadFileProgress";

export default function Index() {
	const [fileList, set_fileList] = useState([]);
	const onChange = (files) => {
		set_fileList(files);
	};
	return (
		<Container>
			<MyHeader></MyHeader>
			<DragUpload onChange={onChange}></DragUpload>
			<div className="d-flex flex-column" style={{ rowGap: "10px" }}>
				{fileList.map((file) => {
					return <UploadFileProgress file={file}></UploadFileProgress>;
				})}
			</div>
		</Container>
	);
}
