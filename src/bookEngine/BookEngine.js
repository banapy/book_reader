
import Storage from "./storage/Storage"
import Book from './Book'
import * as Utils from '@/utils'
import { EventClass } from "./EventClass"
import Render from "./Render/Render"
import UserConfig from "./UserConfig"
export default class BookEngine extends EventClass {
    constructor(options) {
        super()
        this.options = options
        this.storage = new Storage()
        this.bookMap = new Map()
        this.render = new Render({ be: this })
        console.log("bookEngine inited")
        console.log(this)
        this.initDefer = Utils.getDefer()
        Promise.all([
            UserConfig.fromStorage(this.storage).then(userConfig => {
                this.userConfig = userConfig
            }),
            this.initBookMap()
        ]).then(res => {
            this.bookMap.forEach(book => {
                book.isFavorite = this.isFavorite(book.id)
                book.on("bookChanged", (e) => {
                    this.emit("bookChanged", e)
                })
            })
            this.initDefer.resolve(this)
        })
        this.render.on("highLight", e => {
            this.emit("highLight", e)
        })
        this.render.on("click", e => {
            this.emit("click", e)
        })
    }
    initBookMap() {
        return Book.getListFromStorage(this.storage).then(bookList => {
            bookList.forEach(this.addBook.bind(this))
        })
    }
    getBookList() {
        const list = []
        this.bookMap.forEach(book => {
            list.push(book)
        })
        return list
    }
    addBookFromFile(file) {
        console.log(file)
        if (Book.validateFile(file)) {
            const book = new Book({ file, storage: this.storage })
            this.addBook(book)
        } else {
            this.emit("addBook", {
                ok: false,
                file: file
            })
        }
    }
    addFavoriteBook(bookId) {
        this.userConfig.addFavoriteBook(bookId)
        const book = this.getBook(bookId)
        book.isFavorite = true
    }
    removeFavoriteBook(bookId) {
        this.userConfig.removeFavoriteBook(bookId)
        const book = this.getBook(bookId)
        book.isFavorite = false
    }
    isFavorite(bookId) {
        return this.userConfig.isFavorite(bookId)
    }
    getBook(id) {
        return this.bookMap.get(id)
    }
    addBook(book) {
        this.bookMap.set(book.id, book)
        this.emit("addBook", {
            ok: true,
            book: book
        })
    }
    removeBook(book) {
        let id
        if (book instanceof Book) {
            id = book.id
        } else {
            id = book
        }
        let oldBook = this.bookMap.get(id)
        oldBook.delete()
        this.bookMap.delete(id)
        this.emit("removeBook", {
            ok: true,
            book: oldBook
        })
        return oldBook
    }
    renderBook(bookId, eleId) {
        const book = this.getBook(bookId)
        if (!book) throw "book is not exist"
        this.render.renderBook(book, eleId)
        this.emit("renderBook", book)
    }
    //新增一条高亮
    addHighLight(type, cfiRange, text, userData) {
        const id = Utils.uuid()
        const highLight = {
            type,
            cfiRange,
            text,
            userData,
            id,
        }
        this.userConfig.addHighLight(this.render.bookId, highLight)
        this.render.addHighLight(highLight)
    }
    removeHighLight(highLightOrId) {
        this.userConfig.removeHighLight(this.render.bookId, highLightOrId)
        this.render.removeHighLight(highLightOrId)
    }
    getHighLightList(bookId) {
        return this.userConfig.getHighLightList(bookId)
    }
    cancelRender() {
        const readingRecord = this.render.cancelRender()
        this.userConfig.addReaingRecord(readingRecord)
    }
    next() {
        this.render.next()
    }
    prev() {
        this.render.prev()
    }
    destroy() {
        this.cancelRender()
        this.render.destroy()
        this.bookMap.forEach(book => book.destroy())
        this.bookMap.clear()
        this.userConfig.destroy()
    }
}