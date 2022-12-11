import mitt from 'mitt';
export default class EventClass {
    constructor() {
        this.mitter = mitt();
        this.offHandlerList = [];
    }
    on(type, handler) {
        this.mitter.on(type, handler);
        this.offHandlerList.push(() => {
            this.off(type, handler);
        });
    }
    off(type, hanlder) {
        this.mitter.off(type, hanlder);
    }
    emit(type, payload) {
        this.mitter.emit(type, payload);
    }
    destroy() {
        this.offHandlerList.forEach((hanlder) => {
            hanlder();
        });
    }
}
