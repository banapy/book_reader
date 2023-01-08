import Book from "../Book";
import BookMetaData from "./BookMetaData";

export default class Storage {
    constructor() {
        this.dbName = this.getDbName()
        this.db = new PouchDB(this.dbName);
    }
    get(options) {
        const { id, pageSize = 10, pageNo = 1, selector, fields } = options
        if (id) {
            return this.db.get(id)
        } else {
            if (selector) {
                return this.db.find({
                    selector,
                    fields: fields,
                    descending: true, // 降序排列
                    skip: pageSize * pageNo,// 第3页
                    limit: pageSize // 每页10条
                })
            } else {
                return this.db.allDocs({
                    include_docs: true, // 返回的数据中默认只有id和rev，带上数据需传true
                    descending: true, // 降序排列
                    skip: pageSize * (pageNo - 1),// 第3页
                    limit: pageSize // 每页10条
                })
            }
        }
    }
    getDbName() {
        return "book_room"
    }
    removeBook() { }
    udpateBook() { }
    getBook(id) {
        return this.get({ id })
    }

    addHl() { }
    removeHl() { }
    udpateHl() { }
    getHl(id) { return this.get({ id }) }
    addAppConfig() { }
    removeAppConfig() { }
    udpateAppConfig() { }
    getAppConfig(id) { return this.get({ id }) }
    addUserConfig() { }
    removeUserConfig() { }
    udpateUserConfig() { }
    getUserConfig(id) { return this.get({ id }) }
}