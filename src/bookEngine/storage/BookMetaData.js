import PouchDBModel from './PouchDBModel'
export default class BookMetaData extends PouchDBModel {
    static docType = "bookMetaData"
    constructor(document) {
        document.docTypeIn = BookMetaData.docType
        super(document)
        this.name = document.name
        this.author = document.author
        this.charset = document.charset
        this.cover = document.cover
        this.description = document.description
        this.format = document.format
        this.key = document.key
        this.md5 = document.md5
        this.path = document.path
        this.publisher = document.publisher
        this.size = document.size
        this.toc = document.toc
    }
}