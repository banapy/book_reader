import Tooltip from "rc-tooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SvgIcon from "../SvgIcon";
export default function Index(props) {
	const [menuShow, set_menuShow] = useState(false);
	const toggleChapterMenu = () => {
		const v = !menuShow;
		set_menuShow(v);
		props.menuShowChange && props.menuShowChange(v);
	};
	const [note, set_note] = useState(false);
	const toggleNote = () => {
		const v = !note;
		set_note(v);
		props.noteChange && props.noteChange(v);
	};
	const navigate = useNavigate();
	return (
		<div
			className="p-2 pl-5 bg-white shadow-sm fixed w-full top-0 left-0 right-0 bg-opacity-100"
			style={{ zIndex: 1 }}
		>
			<Tooltip
				placement="right"
				trigger={["hover"]}
				overlay={<span>返回书架</span>}
			>
				<SvgIcon
					onClick={(e) => navigate("/")}
					name="bookRoom"
					className="cursor-pointer mr-2"
				></SvgIcon>
			</Tooltip>
			<Tooltip
				placement="bottom"
				trigger={["hover"]}
				overlay={<span>目录</span>}
			>
				<SvgIcon
					onClick={toggleChapterMenu}
					name="menu"
					className="cursor-pointer mr-2"
				></SvgIcon>
			</Tooltip>
			<Tooltip
				placement="bottom"
				trigger={["hover"]}
				overlay={<span>笔记</span>}
			>
				<SvgIcon
					onClick={toggleNote}
					name="note"
					className="cursor-pointer mr-2"
				></SvgIcon>
			</Tooltip>
		</div>
	);
}
