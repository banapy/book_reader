
import Storage from "./storage/Storage"
import Book from './Book'
import * as Utils from '@/utils'
import { EventClass } from "./EventClass"
export default class BookEngine extends EventClass {
    constructor(options) {
        super()
        this.options = options
        this.storage = new Storage()
        this.bookMap = new Map()
        console.log("bookEngine inited")
        console.log(this)
        this.initDefer = Utils.getDefer()
        this.initBookMap()
    }
    initBookMap() {
        Book.getListFromStorage(this.storage).then(bookList => {
            console.log(bookList)
            bookList.forEach(this.addBook.bind(this))
            this.initDefer.resolve()
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
    render() { }
    next() { }
    pre() { }
    destroy() { }
    setPageTrunMode() {
    }
}