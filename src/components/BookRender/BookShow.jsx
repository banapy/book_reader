import EventClass from "@/utils/EventClass";
import * as Api from "@/api";
export default class BookShow extends EventClass {
	constructor(bookId, ele) {
		super();
		this.annoMap = {};
		this.ExcuteClick = true;
		this.bookId = bookId;
		const url = Api.baseURL + "/static/files/" + this.bookId;
		this.myAnnotations = {};
		let book = ePub(url, { openAs: "epub" });
		this.book = book;
		this.book.ready.then(() => {
			this.book.locations.generate();
		});
		this.rendition = book.renderTo(ele, {
			width: "100%",
			height: "100%",
			spread: "none",
			layout: "pre-paginated",
		});
		this.rendition.themes.default({
			"::selection": {
				background: "rgba(255,255,0, 0.3)",
			},
		});
		this.rendition.display();
		console.log(this);
		this.initBookEvent();
		this.initKeyboardEvent();
		["onSelectedAndMarkClicked", "_highLight"].forEach((x) => {
			this[x] = this[x].bind(this);
		});
		Api.getReadingInfo(this.bookId).then((res) => {
			if (res.code === 0) {
				res.data.highLightList.forEach((userData) => {
					this.highLight(
						userData.type,
						userData.cfiRange,
						userData
					);
				});
			}
		});
	}
	getCurrentPercentage() {
		const currentLocation = this.book.rendition.currentLocation();
		return (
			Math.floor(
				this.book.locations
					.percentageFromCfi(currentLocation.start.cfi)
					.toFixed(5) * 10000
			) / 100
		);
	}
	initBookEvent() {
		this.rendition.on("selected", (cfiRange, contents) => {
			this.onSelectedAndMarkClicked(cfiRange, contents);
		});
		this.rendition.on("markClicked", (cfiRange, data, contents) => {
			this.onSelectedAndMarkClicked(cfiRange, contents, data);
			this.ExcuteClick = false;
			setTimeout(() => {
				this.ExcuteClick = true;
			});
		});
		const onClick = (e) => {
			if (!this.ExcuteClick) return;
			this.emit("click", e);
		};
		this.rendition.on("rendered", (section, iframe) => {
			iframe.window.addEventListener("click", (e) => {
				onClick(e);
			});
		});
		// window.addEventListener("click", (e) => {
		// 	onClick(e);
		// });
	}
	onSelectedAndMarkClicked(cfiRange, contents, userData) {
		let selection = contents.window.getSelection();
		let rect = selection.getRangeAt(0).getBoundingClientRect();
		const delta = this.rendition._layout.delta;
		let x = (rect.x % delta) + this.rendition.manager.container.offsetLeft;
		let y = rect.y + this.rendition.manager.container.offsetTop;
		this.emit("highLight", {
			cfiRange,
			contents,
			selection,
			coord: [x, y],
			rect,
			userData,
		});
	}
	initKeyboardEvent() {
		this.book.ready.then(() => {
			this.keyupCb = (e) => {
				// Left Key
				if ((e.keyCode || e.which) == 37) {
					this.book.package.metadata.direction === "rtl"
						? this.rendition.next()
						: this.rendition.prev();
				}
				if ((e.keyCode || e.which) == 39) {
					this.book.package.metadata.direction === "rtl"
						? this.rendition.prev()
						: this.rendition.next();
				}
			};
			this.rendition.on("keyup", this.keyupCb);
			document.addEventListener("keyup", this.keyupCb, false);
		});
	}
	_highLight(type, cfiRange, userData) {
		let id = getAnnoId(type, cfiRange);
		const anno = this.rendition.annotations.add(
			type,
			cfiRange,
			{ ...userData, annoId: id },
			this.onHighLightClick,
			"my-" + type,
			{}
		);
		this.annoMap[cfiRange] = anno;
	}
	highLight(type, cfiRange, userData) {
		//??????userData???ID????????????????????????????????????????????????????????????????????????
		let id = getAnnoId(type, cfiRange);
		let anno = this.rendition.annotations._annotations[id];
		if (!anno) {
			if (userData.id) {
				//??????????????????????????????
				this._highLight(type, cfiRange, userData);
			} else {
				//????????????????????????????????????
				Api.saveuserData(
					this.bookId,
					type,
					cfiRange,
					userData.review
				).then((res) => {
					if (res.code === 0) {
						userData.id = res.data.highLightId;
						this._highLight(type, cfiRange, userData);
					}
				});
			}
		} else {
			console.error("anno?????????", type, cfiRange, userData);
		}
	}
	removeHighLight(userData) {
		Api.removeuserData(this.bookId, userData.id).then((res) => {
			if (res.code == 0) {
				this.rendition.annotations.remove(
					userData.cfiRange,
					userData.type
				);
			}
		});
	}

	destroy() {
		this.book.destroy();
	}
}

function getAnnoId(type, cfiRange) {
	return encodeURI(cfiRange + type);
}
function contains(item, target, x, y) {
	// offset
	var offset = target.getBoundingClientRect();

	function rectContains(r, x, y) {
		var top = r.top - offset.top;
		var left = r.left - offset.left;
		var bottom = top + r.height;
		var right = left + r.width;
		return top <= y && left <= x && bottom > y && right > x;
	}

	// Check overall bounding box first
	var rect = item.getBoundingClientRect();
	if (!rectContains(rect, x, y)) {
		return false;
	}

	// Then continue to check each child rect
	var rects = item.getClientRects();
	for (var i = 0, len = rects.length; i < len; i++) {
		if (rectContains(rects[i], x, y)) {
			return true;
		}
	}
	return false;
}
