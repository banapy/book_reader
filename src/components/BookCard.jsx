import { useNavigate } from "react-router-dom";
import {
	Menu,
	Item,
	Separator,
	Submenu,
	useContextMenu,
} from "react-contexify";
import "react-contexify/ReactContexify.css";
export default function Index(props) {
	const navigate = useNavigate();
	const onClickBook = () => {
		navigate("/bookViewer/" + props.id);
	};
	const MENU_ID = props.id;
	const { show } = useContextMenu({
		id: MENU_ID,
	});
	function handleContextMenu(event) {
		show({
			event,
			props: {
				key: "value",
			},
		});
	}
	const handleItemClick = ({ id }) => {
		switch (id) {
			case "删除":
				be.removeBook(props.id);
				break;
			case "爱了":
				be.addFavoriteBook(props.id);
				break;
			case "不爱了":
				be.removeFavoriteBook(props.id);
				break;
			case "查看详情":
				navigate("/bookIntro/" + props.id);
				break;
		}
	};
	console.log("props.isFavorite");
	console.log(props.isFavorite);
	return (
		<div
			className="flex flex-col items-center cursor-pointer lg:w-28 xs:w-3/12"
			onClick={onClickBook}
			onContextMenu={handleContextMenu}
		>
			<img src={props.cover} alt="" className="w-full h-5/6" />
			<div className="truncate whitespace-pre h-16 w-full line-clamp-2">
				{props.bookName}
			</div>
			<Menu id={MENU_ID}>
				<Item id="删除" onClick={handleItemClick}>
					删除
				</Item>
				{props.isFavorite ? (
					<Item id="不爱了" onClick={handleItemClick}>
						不爱了💔
					</Item>
				) : (
					<Item id="爱了" onClick={handleItemClick}>
						爱了💕
					</Item>
				)}
				<Item id="查看详情" onClick={handleItemClick}>
					查看详情
				</Item>
			</Menu>
		</div>
	);
}
Index.Container = Container;
function Container(props) {
	return (
		<div className="flex flex-wrap" style={{ gap: "10px" }}>
			{props.children}
		</div>
	);
}
