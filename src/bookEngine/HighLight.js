import { EventClass } from "./EventClass";

export default class HighLight {
    constructor(options) {
        this.cfiRange = options.cfiRange
        this.id = options.id
        this.type = options.type
        this.review = options.review
        this.text = options.text
    }
}