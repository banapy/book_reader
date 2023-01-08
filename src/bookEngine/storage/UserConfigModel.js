import PouchDBModel from './PouchDBModel'
export default class UserConfigModel extends PouchDBModel {
    static docType = "UserConfigModel"
    constructor(document) {
        document.docTypeIn = UserConfigModel.docType
        super(document, {
            onlyOne: true
        })
        this.favoriteBooks = document.favoriteBooks
        this.readerConfig = document.readerConfig
        this.bookTracker = document.bookTracker
    }
}