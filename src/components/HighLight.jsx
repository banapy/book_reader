import {
	Button,
	ButtonGroup,
	Card,
	FloatingLabel,
	Form,
	Toast,
} from "react-bootstrap";
import { copyTextToClipboard } from "@/utils";
import { useEffect, useState } from "react";
export default function Index(props) {
	const [highLight, set_highLight] = useState({
		show: false,
		left: 0,
		bottom: 0,
		text: "",
		cfiRange: "",
		reviewShow: false,
		userData: null,
	});
	const [isTop, set_isTop] = useState(true);
	useEffect(() => {
		be.initDefer.promise.then(() => {
			be.on("highLight", ({ cfiRange, coord, selection, rect, userData }) => {
				let marginY = 10; //菜单上下的间距
				let bottom = 0;
				let height = document.getElementById("high-light-menu").clientHeight;
				if (
					rect.y - height - marginY * 2 >
					be.render._render.rendition.manager.container.offsetTop
				) {
					//菜单显示到到选中文字的上方
					bottom = document.body.clientHeight - coord[1] + marginY * 2;
					set_isTop(true);
				} else {
					//菜单显示到到选中文字的下方
					bottom =
						document.body.clientHeight -
						(coord[1] + rect.height + height + marginY);
					set_isTop(false);
				}
				set_highLight({
					show: true,
					left: coord[0],
					bottom: bottom,
					text: selection.toString(),
					cfiRange,
					userData,
					reviewShow: userData
						? userData.review === ""
							? false
							: true
						: false,
				});
			});
			be.on("click", () => {
				set_highLight({
					...highLight,
					show: false,
				});
			});
		});
	}, []);
	const setHighLight = (type) => {
		if (type !== "删除划线") {
			be.addHighLight(type, highLight.cfiRange, highLight.text, { review: "" });
		} else {
			//此处的highLight.userData.highLight就是上面的addHeighLight的参数
			be.removeHighLight(highLight.userData.highLight);
		}
		set_highLight({
			...highLight,
			show: false,
		});
	};
	const onSaveReview = (review) => {
		// highLight.myHighLightData.review = review;
		// highLight.reviewShow = false;
		// set_highLight({ ...highLight });
		// Api.saveMyHighLightData(
		// 	highLight.bookId,
		// 	highLight.myHighLightData.type,
		// 	highLight.myHighLightData.cfiRange,
		// 	highLight.myHighLightData.review,
		// 	highLight.myHighLightData.id
		// ).then((res) => {
		// 	if (res.code === 0) {
		// 		bookShow._highLight(
		// 			highLight.myHighLightData.type,
		// 			highLight.myHighLightData.cfiRange,
		// 			highLight.myHighLightData
		// 		);
		// 	}
		// });
	};
	const onDeleteReview = () => {
		// highLight.myHighLightData.review = "";
		// set_highLight({ ...highLight });
		// Api.removeMyHighLightData(
		// 	highLight.bookId,
		// 	highLight.myHighLightData.id
		// ).then((res) => {
		// 	if (res.code === 0) {
		// 		bookShow._highLight(
		// 			highLight.myHighLightData.type,
		// 			highLight.myHighLightData.cfiRange,
		// 			highLight.myHighLightData
		// 		);
		// 	}
		// });
	};
	console.log(highLight.left, highLight.bottom, highLight.show);
	return (
		<div
			className="absolute"
			id="high-light-menu"
			style={{
				left: highLight.left + "px",
				bottom: highLight.bottom + "px",
				opacity: highLight.show ? "1" : "0",
			}}
		>
			{/* {isTop ? (
				<HighLightReview
					highLight={highLight}
					updateShow={(e) => {
						set_highLight({
							...highLight,
							reviewShow: e,
						});
					}}
					onSave={onSaveReview}
					onDelete={onDeleteReview}
				></HighLightReview>
			) : null} */}
			<div class="flex items-center justify-center shadow rounded p-1 bg-gray-400">
				<div
					class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
					role="group"
				>
					<button
						type="button"
						class=" inline-block lg:px-6 xs:px-2 lg:py-2.5 xs:py-1 xs:w-16 bg-gray-800 text-white font-medium lg:text-xs xs:text-sm leading-tight uppercase hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
						onClick={(e) => {
							copyTextToClipboard(highLight.text);
						}}
					>
						复制
					</button>
					<button
						type="button"
						class=" inline-block lg:px-6 xs:px-2 lg:py-2.5 xs:py-1 xs:w-16 bg-gray-800 text-white font-medium lg:text-xs xs:text-sm leading-tight uppercase hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
						onClick={(e) => {
							setHighLight("highlight");
						}}
					>
						马克笔
					</button>
					<button
						type="button"
						class=" inline-block lg:px-6 xs:px-2 lg:py-2.5 xs:py-1 xs:w-16 bg-gray-800 text-white font-medium lg:text-xs xs:text-sm leading-tight uppercase hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
						onClick={(e) => {
							setHighLight("underline");
						}}
					>
						直线
					</button>
					<button
						type="button"
						class=" inline-block lg:px-6 xs:px-2 lg:py-2.5 xs:py-1 xs:w-16 bg-gray-800 text-white font-medium lg:text-xs xs:text-sm leading-tight uppercase hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
						onClick={(e) => {
							setHighLight("mark");
						}}
					>
						标记
					</button>
					<button
						type="button"
						class=" inline-block lg:px-6 xs:px-2 lg:py-2.5 xs:py-1 xs:w-16 bg-gray-800 text-white font-medium lg:text-xs xs:text-sm leading-tight uppercase hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
						onClick={(e) => {
							setHighLight("删除划线");
						}}
					>
						删除划线
					</button>
					<button
						type="button"
						class=" inline-block lg:px-6 xs:px-2 lg:py-2.5 xs:py-1 xs:w-16 bg-gray-800 text-white font-medium lg:text-xs xs:text-sm leading-tight uppercase hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
						onClick={(e) => {
							set_highLight({
								...highLight,
								reviewShow: true,
							});
						}}
					>
						写想法
					</button>
					<button
						type="button"
						class=" inline-block lg:px-6 xs:px-2 lg:py-2.5 xs:py-1 xs:w-16 bg-gray-800 text-white font-medium lg:text-xs xs:text-sm leading-tight uppercase hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
						onClick={(e) => {
							set_highLight({
								...highLight,
								reviewShow: true,
							});
						}}
					>
						查询
					</button>
				</div>
			</div>
			{/* {!isTop ? (
				<HighLightReview
					highLight={highLight}
					updateShow={(e) => {
						set_highLight({
							...highLight,
							reviewShow: e,
						});
					}}
					onSave={onSaveReview}
					onDelete={onDeleteReview}
				></HighLightReview>
			) : null} */}
		</div>
	);
}
function HighLightReview(props) {
	if (!props.highLight.userData) {
		return null;
	}
	let needAdd = !props.highLight.userData.review;
	const [show, set_show] = useState(false);
	useEffect(() => {
		set_review(props.highLight.myHighLightData.review);
	}, [props.highLight.myHighLightData.review]);
	return (
		<Toast
			onClose={(e) => {
				props.updateShow(false);
			}}
			style={{ opacity: props.highLight.show ? "1" : "0" }}
			animation={true}
		>
			<Toast.Header closeButton={needAdd}>
				<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
				<strong className="me-auto">评论</strong>
				{needAdd ? null : <small>{props.highLight.userData.updateAt}</small>}
			</Toast.Header>
			<Toast.Body>
				{needAdd ? (
					<Form>
						<FloatingLabel
							controlId="floatingInput"
							label="说点什么"
							className="mb-3"
						>
							<Form.Control
								type="text"
								placeholder="说点什么"
								onChange={(e) => set_review(e.target.value)}
							/>
						</FloatingLabel>
						<div className="d-flex justify-content-center">
							<Button variant="primary" onClick={(e) => props.onSave(review)}>
								提交
							</Button>
						</div>
					</Form>
				) : (
					<div>
						<p>{props.highLight.userData.review}</p>
						<Button variant="link" onClick={props.onDelete}>
							删除
						</Button>
					</div>
				)}
			</Toast.Body>
		</Toast>
	);
}
