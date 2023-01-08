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
		navigate("/bookIntro/" + props.id);
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
		}
	};
	console.log("props.isFavorite");
	console.log(props.isFavorite);
	return (
		<div
			className="d-flex flex-column align-items-center"
			style={{ width: "fit-content", cursor: "pointer" }}
			onClick={onClickBook}
			onContextMenu={handleContextMenu}
		>
			<img src={props.cover} alt="" style={{ width: "120px" }} />
			<span className="" style={{ maxWidth: "120px" }}>
				{props.bookName}
			</span>
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
			</Menu>
		</div>
	);
}
Index.Container = Container;
function Container(props) {
	return (
		<div className="d-flex flex-wrap" style={{ gap: "10px" }}>
			{props.children}
		</div>
	);
}
