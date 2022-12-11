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
		myHighLightData: null,
	});
	const [isTop, set_isTop] = useState(true);
	useEffect(() => {
		props.bookShowPromise.then((bookShow) => {
			bookShow.on(
				"highLight",
				({ cfiRange, coord, selection, rect, myHighLightData }) => {
					let marginY = 10; //菜单上下的间距
					let bottom = 0;
					let height = document.getElementById("high-light-menu").clientHeight;
					if (
						rect.y - height - marginY * 2 >
						bookShow.rendition.manager.container.offsetTop
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
						myHighLightData,
						reviewShow: myHighLightData
							? myHighLightData.review === ""
								? false
								: true
							: false,
					});
				}
			);
			// bookShow.on("click", (e) => {
			// 	set_highLight({
			// 		...highLight,
			// 		show: false,
			// 	});
			// });
		});
	}, []);
	const setHighLight = (type) => {
		if (type !== "删除划线") {
			props.bookShowPromise.then((bookShow) => {
				bookShow.highLight(type, highLight.cfiRange, { review: "" });
			});
		} else {
			props.bookShowPromise.then((bookShow) => {
				bookShow.removeHighLight(highLight.myHighLightData);
			});
		}
		set_highLight({
			...highLight,
			show: false,
		});
	};
	return (
		<div
			className="position-absolute"
			id="high-light-menu"
			style={{
				left: highLight.left + "px",
				bottom: highLight.bottom + "px",
				opacity: highLight.show ? "1" : "0",
			}}
		>
			{isTop ? (
				<HighLightReview
					// show={highLight.reviewShow}
					highLight={highLight}
					updateShow={(e) => {
						set_highLight({
							...highLight,
							reviewShow: e,
						});
					}}
				></HighLightReview>
			) : null}
			<ButtonGroup>
				<Button
					onClick={(e) => {
						copyTextToClipboard(highLight.text);
					}}
				>
					复制
				</Button>
				<Button
					onClick={(e) => {
						setHighLight("highlight");
					}}
				>
					马克笔
				</Button>
				<Button
					onClick={(e) => {
						setHighLight("underline");
					}}
				>
					直线
				</Button>
				<Button
					onClick={(e) => {
						setHighLight("mark");
					}}
				>
					标记
				</Button>
				<Button
					onClick={(e) => {
						setHighLight("删除划线");
					}}
				>
					删除划线
				</Button>
				<Button
					onClick={(e) => {
						set_highLight({
							...highLight,
							reviewShow: true,
						});
					}}
				>
					写想法
				</Button>
				<Button>查询</Button>
			</ButtonGroup>
			{!isTop ? (
				<HighLightReview
					// show={highLight.reviewShow}
					highLight={highLight}
					updateShow={(e) => {
						set_highLight({
							...highLight,
							reviewShow: e,
						});
					}}
				></HighLightReview>
			) : null}
		</div>
	);
}
function HighLightReview(props) {
	if (!props.highLight.myHighLightData) {
		return null;
	}
	let needAdd = !props.highLight.myHighLightData.review;
	const [show, set_show] = useState(false);
	useEffect(() => {
		set_show(props.highLight.reviewShow);
	}, [props.highLight.reviewShow]);
	return (
		<Toast
			onClose={(e) => {
				set_show(false);
				props.updateShow(false);
			}}
			style={{ opacity: show ? "1" : "0" }}
			animation={true}
		>
			<Toast.Header closeButton={needAdd}>
				<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
				<strong className="me-auto">评论</strong>
				{needAdd ? null : (
					<small>{props.highLight.myHighLightData.updateAt}</small>
				)}
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
								onChange={(e) =>
									props.onReviewChange({ review: e.target.value })
								}
							/>
						</FloatingLabel>
						<div className="d-flex justify-content-center">
							<Button variant="primary" type="submit">
								提交
							</Button>
						</div>
					</Form>
				) : (
					<div>
						<p>{props.highLight.myHighLightData.review}</p>
						<Button variant="link" onClick={props.onDelete}>
							删除
						</Button>
					</div>
				)}
			</Toast.Body>
		</Toast>
	);
}
