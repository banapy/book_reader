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
import * as Api from "@/api";
export default function Index(props) {
	const [highLight, set_highLight] = useState({
		show: false,
		left: 0,
		bottom: 0,
		text: "",
		cfiRange: "",
		reviewShow: false,
		myHighLightData: null,
		bookId: -1,
	});
	const [isTop, set_isTop] = useState(true);
	useEffect(() => {
		props.bookShowPromise.then((bookShow) => {
			set_highLight({ ...highLight, bookId: bookShow.bookId });
			bookShow.on(
				"highLight",
				({ cfiRange, coord, selection, rect, myHighLightData }) => {
					let marginY = 5; //菜单上下的间距
					let bottom = 0;
					let height = document.getElementById("high-light-menu").clientHeight;
					let width = document.getElementById("high-light-menu").clientWidth;
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
						bookId:bookShow.bookId,
						show: true,
						left: coord[0] + rect.width / 2 - width / 2,
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
			bookShow.on("click", (e) => {
				set_highLight({
					...highLight,
					show: false,
				});
			});
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
	const onSaveReview = (review) => {
		highLight.myHighLightData.review = review;
		highLight.reviewShow = false;
		set_highLight({ ...highLight });
		Api.saveMyHighLightData(
			highLight.bookId,
			highLight.myHighLightData.type,
			highLight.myHighLightData.cfiRange,
			highLight.myHighLightData.review,
			highLight.myHighLightData.id
		).then((res) => {
			if (res.code === 0) {
				bookShow._highLight(
					highLight.myHighLightData.type,
					highLight.myHighLightData.cfiRange,
					highLight.myHighLightData
				);
			}
		});
	};
	const onDeleteReview = () => {
		highLight.myHighLightData.review = "";
		set_highLight({ ...highLight });
		Api.removeMyHighLightData(
			highLight.bookId,
			highLight.myHighLightData.id
		).then((res) => {
			if (res.code === 0) {
				bookShow._highLight(
					highLight.myHighLightData.type,
					highLight.myHighLightData.cfiRange,
					highLight.myHighLightData
				);
			}
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
					onSave={onSaveReview}
					onDelete={onDeleteReview}
				></HighLightReview>
			) : null}
		</div>
	);
}
function HighLightReview(props) {
	if (!props.highLight.myHighLightData) {
		return null;
	}
	let needAdd = props.highLight.myHighLightData.review;
	const [review, set_review] = useState(props.highLight.myHighLightData.review);
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
