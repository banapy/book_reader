import { EventClass } from "../EventClass";
import EpubRender from "./EpubRender";

export default class Render extends EventClass {
    static renderLibrary = {}
    static registerRender(type, render) {
        Render.renderLibrary[type] = render
    }
    constructor(options) {
        super()
        this.be = options.be
        this.startTime = null
    }
    get bookId() {
        return this._render.book.id
    }
    get book() {
        return this._render.book
    }
    get percentage() {
        return this._render.percentage
    }
    renderBook(book, eleId) {
        const _Render = Render.renderLibrary[book.metaData.format]
        this._render = new _Render(be, book, eleId)
        this.startTime = new Date()
        this._render.on("highLight", e => {
            this.emit("highLight", e)
        })
        this._render.on("click", e => {
            this.emit("click", e)
        })
        this._render.on("percentageChange", e => {
            this.emit("percentageChange", e)
        })
        const highLightList = this.be.getHighLightList(this.bookId)
        highLightList.forEach(highLight => {
            this.addHighLight(highLight)
        })
        this.goPercentage(this.be.getPercentage(this.bookId))
    }
    next() {
        this._render.next()
    }
    prev() {
        this._render.prev()
    }
    goChapter(href) {
        this._render.goChapter(href)
    }
    goPercentage(percentage) {
        this._render.goPercentage(percentage)
    }
    destroy() {
        this.cancelRender()
    }
    cancelRender() {
        const bookId = this.bookId
        this._render.destroy()
        const startTime = this.startTime
        return {
            startime: startTime,
            endTime: new Date(),
            bookId: bookId
        }
    }
    addHighLight(highLight) {
        return this._render.addHighLight(highLight)
    }
    removeHighLight(highLightOrId) {
        this._render.removeHighLight(highLightOrId)
    }

}
Render.registerRender("epub", EpubRender)