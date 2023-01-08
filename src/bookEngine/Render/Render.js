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
        const highLightList = this.be.getHighLightList(this.bookId)
        highLightList.forEach(highLight => {
            this.addHighLight(highLight)
        })
    }
    next() {
        this._render.next()
    }
    prev() {
        this._render.prev()
    }
    destroy() {
        this.cancelRender()
    }
    cancelRender() {
        const bookId = this.bookId
        this._render.destroy()
        const startTime = this.startTime
        this.startTime = null
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