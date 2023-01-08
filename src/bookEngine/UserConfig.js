import UserConfigModel from "./storage/UserConfigModel"
import * as Utils from '@/utils'

export default class UserConfig {
    constructor(options) {
        this.storage = options.storage
        this.model = new UserConfigModel(options.model)
    }
    get db() {
        return this.storage.db
    }
    static async fromStorage(storage) {
        const res = await storage.get({ selector: { docTypeIn: { $eq: UserConfigModel.docType } } })
        if (!res.docs.length) {
            const userConfig = new UserConfig({
                storage, model: {
                    favoriteBooks: [],
                    readerConfig: {
                        appSkin: "default",
                        isCollapsed: false,
                        isOSNight: false,
                        pageTurnMode: "滚动",
                    },
                    bookTracker: {

                    }
                }
            })
            userConfig.model.update(storage)
            return userConfig
        } else {
            return new UserConfig({
                storage,
                model: res.docs[0]
            })
        }
    }
    addFavoriteBook(bookId) {
        const index = this.model.favoriteBooks.findIndex(x => x.bookId === bookId)
        if (index !== -1) {
            return
        }
        this.model.favoriteBooks.push({
            bookId,
            createAt: new Date()
        })
        this.model.update(this.storage)
    }
    removeFavoriteBook(bookId) {
        const index = this.model.favoriteBooks.findIndex(x => x.bookId === bookId)
        if (index === -1) {
            throw `no favorite book,bookId: ${bookId}`
        }
        const oldFavoriteBook = this.model.favoriteBooks.splice(index, 1)
        this.model.update(this.storage)
        return oldFavoriteBook
    }
    isFavorite(bookId) {
        const res = this.model.favoriteBooks.findIndex(x => x.bookId === bookId) !== -1
        return res
    }
    getRecentBook(timeRange) {
        switch (timeRange) {
            case "最近一天":
                break
            case "最近一星期":
                break
            case "最近一月":
                break
            case "最近三个月":
                break
            case "最近一年":
                break
        }
    }
    getReaderConfig(v) {
        return this.model.readerConfig
    }
    setReaderConfig(v) {
        this.model.readerConfig = v
        this.model.update(this.storage)
    }
    setBookTracker(options) {
        // const { bookId, cfi, location, percentage, readingTime, readingRecords ,highLights} = options
        this.model.bookTracker[options.bookId] = options
        this.model.update(this.storage)
    }
    addHighLight(bookId, highLight) {
        if (!this.model.bookTracker[bookId]) {
            this.model.bookTracker[bookId] = {
                highLights: []
            }
        }
        if (!this.model.bookTracker[bookId].highLights) {
            this.model.bookTracker[bookId].highLights = []
        }
        this.model.bookTracker[bookId].highLights.push(highLight)
        return this.model.update(this.storage)
    }
    removeHighLight(bookId, highLightOrId) {
        let _highLightId = ""
        if (typeof highLightOrId === "string") {
            _highLightId = highLightOrId
        } else {
            _highLightId = highLightOrId.id
        }
        const index = this.model.bookTracker[bookId].highLights.findIndex(x => x.id === _highLightId)
        if (index === -1) {
            throw `no high light,high light id is ${_highLightId},book id is ${bookId}`
        }
        const oldValue = this.model.bookTracker[bookId].highLights.splice(index, 1)
        this.model.update(this.storage)
        return oldValue
    }
    getHighLightList(bookId) {
        return this.model.bookTracker[bookId]?.highLights || []
    }
    updateHighLight(bookid, highLight) {
        throw "no implemention"
    }
    addReaingRecord(options) {
        const { bookId, startTime, endTime } = options
        if (!this.model.bookTracker[bookId]) {
            this.model.bookTracker[bookId] = {
                readingRecords: []
            }
        }
        if (!this.model.bookTracker[bookId].readingRecords) {
            this.model.bookTracker[bookId].readingRecords = []
        }
        this.model.bookTracker[bookId].readingRecords.push({
            bookId, startTime, endTime
        })
    }
    destroy() {
        this.model = null
    }
}