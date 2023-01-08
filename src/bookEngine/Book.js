
import BookMetaData from "./storage/BookMetaData"
import * as Parse from './parse'
import { EventClass } from './EventClass'
export default class Book extends EventClass {
    constructor(options) {
        super()
        this.options = options
        this.storage = options.storage
        this.metaData = null
        this._isFavorite = false
        if (options.metaData) {
            this.metaData = options.metaData
        }
        if (options.file) {
            this.setFile(options.file)
        }
        if (options.storage) {
            this.setStorage(options.storage)
        }
    }
    static validateFile(file) {
        let extension = file.name
            .split(".")
            .reverse()[0]
            .toLocaleLowerCase();
        return extension === "epub"
    }
    static async getListFromStorage(storage) {
        const res = await storage.get({ pageSize: 9999, pageNo: 1, selector: { docTypeIn: { $eq: BookMetaData.docType } } })
        const bookSchemaList = res.docs
        console.log(bookSchemaList)
        return bookSchemaList.map(bookSchema => {
            const book = new Book({ metaData: new BookMetaData(bookSchema), storage: storage })
            return book
        })
    }
    get db() {
        return this.storage.db
    }
    get id() {
        return this.metaData.id
    }
    get rev() {
        return this.metaData.rev
    }
    get isFavorite() {
        return this._isFavorite
    }
    set isFavorite(v) {
        const oldValue = this._isFavorite
        this._isFavorite = v
        this.emit("bookChanged", {
            oldValue: oldValue,
            newValue: v,
            field: "isFavorite"
        })

    }
    setStorage(storage) {
        this.storage = storage
    }
    async setFile(file) {
        this.file = file
        const metaData = await Parse.parseFile(file)
        this.metaData = new BookMetaData(metaData)
        this.metaData.addAttachment("file", file)
        this.save()
    }
    getFileFromStorage() {
        return this.db.getAttachment(this.metaData.id, "file").then(blob => {
            return blob
        })
    }
    async save() {
        const oldMetaData = await this.getByName()
        if (oldMetaData) {
            this.metaData = new BookMetaData(oldMetaData)
            return
        }
        const bookSchema = this.metaData.toJson()
        const res = await this.db.post(bookSchema)
        this.metaData.id = res.id
        this.metaData.rev = res.rev
        return res
    }
    getByName() {
        if (!this.metaData) {
            throw "no metadata"
        }
        return this.db.find({
            selector: { name: this.metaData.name, docTypeIn: BookMetaData.docType },
        }).then(res => {
            return res.docs[0]
        })
    }

    update() {

    }
    delete() {
        return this.db.remove(this.id, this.rev)
    }
    render() {

    }
}