export default class PouchDBModel {
    constructor(document, NoModelParams) {
        this._id = document._id
        this._rev = document._rev
        this._attachments = document._attachments
        this.docTypeIn = document.docTypeIn

        this.NoModelParams = NoModelParams
    }
    get id() {
        return this._id
    }
    set id(v) {
        this._id = v
    }
    get rev() {
        return this._rev
    }
    set rev(v) {
        this._rev = v
    }
    get attachments() {
        return this._attachments
    }
    set attachments(v) {
        this._attachments = v
    }
    get docType() {
        return this.docTypeIn
    }
    set docType(v) {
        this.docTypeIn = v
    }
    addAttachment(name, file) {
        if (!this.attachments) {
            this.attachments = {}
        }
        this._attachments[name] = {
            content_type: file.type,
            data: file
        }
    }
    removeAttachment(name) {
        const a = this._attachments[name]
        delete this._attachments[name]
        return a
    }
    toJson() {
        let res = {}
        for (let key in this) {
            if (key !== "NoModelParams") {
                res[key] = this[key]
            }
        }
        return res
    }
    async update(storage) {
        return storage.db.post(this.toJson()).then(res => {
            this.id = res.id
            this.rev = res.rev
            return res
        }).catch(e => {
            console.error(e)
            return e
        })
    }
}