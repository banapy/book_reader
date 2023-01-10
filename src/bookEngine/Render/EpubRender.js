import { EventClass } from "../EventClass";
import { readFileContent, getImgBase64FromSrc, getDefer } from '@/utils'
import ePub from './epubjs/index'
export default class EpubRender extends EventClass {
    constructor(be, book, eleId) {
        super()
        this.book = book
        this.eleId = eleId
        this.be = be
        this.epubBook = null
        this.config = {}
        console.log(this)
        this.initDefer = getDefer()
        this.percentage = 0
        this.init();
        ["onSelectedAndMarkClicked", "_highLight"].forEach((x) => {
            this[x] = this[x].bind(this);
        });
        this.generatePromsie = null
    }
    async init() {
        await this.be.initDefer.promise
        const readerConfig = this.be.userConfig.getReaderConfig()
        const blob = await this.book.getFileFromStorage()
        const fileContent = readFileContent(blob)
        this.epubBook = ePub(fileContent, { openAs: "binary" });
        await this.epubBook.ready
        const defer = getDefer()
        this.generatePromsie = defer.promise
        this.epubBook.ready.then(() => {
            this.epubBook.locations.generate().then(() => {
                defer.resolve()
            })
        });
        this.initDefer.resolve(this)
        switch (readerConfig.pageTurnMode) {
            case "滚动":
                this.rendition = this.epubBook.renderTo(this.eleId, {
                    flow: "scrolled-doc",
                    width: "100%",
                    height: "100%",
                });
                break
            default:
                this.rendition = this.epubBook.renderTo(this.eleId, {
                    flow: "scrolled-doc",
                    width: "100%",
                    height: "100%",
                });
                break
        }

        this.rendition.themes.default({
            "::selection": {
                background: "rgba(255,255,0, 0.3)",
            },
        });
        this.rendition.display();
        this.initBookEvent();
        this.initKeyboardEvent();
    }
    getCurrentPercentage() {
        if (!this.rendition) return 0
        const currentLocation = this.epubBook.rendition.currentLocation();
        const curCfi = currentLocation.start.cfi
        const location = this.epubBook.locations
            .percentageFromCfi(curCfi)
        return location * 100
    }
    initBookEvent() {
        this.rendition.on("selected", (cfiRange, contents) => {
            this.onSelectedAndMarkClicked(cfiRange, contents);
        });
        this.rendition.on("markClicked", (cfiRange, data, contents, a, b, c, d) => {
            console.log(cfiRange, contents, data, a, b, c, d);
            this.onSelectedAndMarkClicked(cfiRange, contents, data);
            this._tempHandler = setTimeout(() => {
                this._tempHandler = null
            }, 100)
        });
        this.rendition.on("rendered", (section, iframe) => {
            iframe.window.addEventListener("click", (e) => {
                if (this._tempHandler) return
                this.emit("click", e);
            });
        });
        window.addEventListener("click", (e) => {
            this.emit("click", e);
        });
    }
    onSelectedAndMarkClicked(cfiRange, contents, userData) {
        let selection = contents.window.getSelection();
        let rect = selection.getRangeAt(0).getBoundingClientRect();
        let ranges = []
        for (let i = 0; i < selection.rangeCount; i++) {
            ranges.push(selection.getRangeAt(i))
        }
        console.log(ranges)
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
    next() {
        this.rendition.next()
    }
    prev() {
        this.rendition.prev()
    }
    goChapter(href) {
        this.rendition.display(href)
    }
    async goPercentage(percentage) {
        await this.initDefer.promise
        await this.generatePromsie
        const location = this.epubBook.locations.cfiFromPercentage(percentage / 100)
        if (location !== -1 && percentage !== 0) {
            this.rendition.display(location)
        } else {
            console.error("定位上次阅读位置失败", location, percentage)
        }
    }
    initKeyboardEvent() {
        this.epubBook.ready.then(() => {
            this.keyupCb = (e) => {
                if ((e.keyCode || e.which) == 37) {
                    this.epubBook.package.metadata.direction === "rtl"
                        ? this.next()
                        : this.prev();
                }
                if ((e.keyCode || e.which) == 39) {
                    this.epubBook.package.metadata.direction === "rtl"
                        ? this.prev()
                        : this.next();
                }
            };
            this.rendition.on("keyup", this.keyupCb);
            window.addEventListener("keyup", this.keyupCb, false);
            this.wheelCb = (e) => {
                const percentage = this.getCurrentPercentage()
                console.log(percentage)
                this.percentage = percentage
                this.emit("percentageChange", percentage)
            }
            window.addEventListener("wheel", this.wheelCb, false)
        });
    }
    async _highLight(highLight) {
        await this.initDefer.promise
        let id = getAnnoId(highLight.type, highLight.cfiRange);
        this.rendition.annotations.add(
            highLight.type,
            highLight.cfiRange,
            { annoId: id, highLight },
            this.onHighLightClick,
            "my-" + highLight.type,
            {}
        );
    }
    //type, cfiRange, text, userData,id
    addHighLight(highLight) {
        return this._highLight(highLight)
    }
    removeHighLight(highLightOrId) {
        this.rendition.annotations.remove(
            highLightOrId.cfiRange,
            highLightOrId.type
        );
    }
    destroy() {
        this.epubBook.destroy();
        document.removeEventListener("keyup", this.keyupCb)
        this.keyupCb = null
    }
}
function getAnnoId(type, cfiRange) {
    return encodeURI(cfiRange + type);
}