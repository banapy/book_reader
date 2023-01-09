import { EventClass } from "../EventClass";
import { readFileContent, getImgBase64FromSrc, getDefer } from '@/utils'

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
        this.init();
        ["onSelectedAndMarkClicked", "_highLight"].forEach((x) => {
            this[x] = this[x].bind(this);
        });
    }
    async init() {
        await this.be.initDefer.promise
        const readerConfig = this.be.userConfig.getReaderConfig()
        const blob = await this.book.getFileFromStorage()
        const fileContent = readFileContent(blob)
        this.epubBook = ePub(fileContent, { openAs: "binary" });
        await this.epubBook.ready
        this.initDefer.resolve(this)
        this.epubBook.ready.then(() => {
            this.epubBook.locations.generate();
        });
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
        const currentLocation = this.epubBook.rendition.currentLocation();
        return (
            Math.floor(
                this.epubBook.locations
                    .percentageFromCfi(currentLocation.start.cfi)
                    .toFixed(5) * 10000
            ) / 100
        );
    }
    initBookEvent() {
        this.rendition.on("selected", (cfiRange, contents) => {
            this.onSelectedAndMarkClicked(cfiRange, contents);
        });
        this.rendition.on("markClicked", (cfiRange, data, contents, a, b, c, d) => {
            console.log(cfiRange, contents, data, a, b, c, d);
            this.onSelectedAndMarkClicked(cfiRange, contents, data);
        });
        this.rendition.on("rendered", (section, iframe) => {
            iframe.window.addEventListener("click", (e) => {
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
            document.addEventListener("keyup", this.keyupCb, false);
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