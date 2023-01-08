import axios from './axios'

export function getUserInfo() {
    const savedValue = localStorage.getItem("userInfo")
    if (savedValue != null) {
        return JSON.parse(savedValue)
    } else {
        return {
            token: "",
            name: "",
            uid: "",
            email: "",
        }
    }
}
export function getReadingInfo(bookId) {
    let userInfo = getUserInfo()
    return axios.get("/api/bookRoom/userInfo/readingInfos", {
        params: {
            uid: userInfo.uid,
            bookId: bookId,
        }
    });
}
export function saveuserData(bookId, type, cfiRange, review, highLightId) {
    let userInfo = getUserInfo()
    return axios.post("/api/bookRoom/userInfo/readingInfos", {
        uid: userInfo.uid,
        bookId: bookId,
        highLight: {
            type,
            cfiRange,
            review,
            id: highLightId,
            color: ""
        }
    });
}
export function removeuserData(bookId, highLightId) {
    let userInfo = getUserInfo()
    return axios.post("/api/bookRoom/userInfo/readingInfos/highLights/delete", {
        uid: userInfo.uid,
        bookId: bookId,
        highLight: {
            id: highLightId,
        }
    });
}
export function removeMyBookMark(bookId, bookMarkId) {
    let userInfo = getUserInfo()
    return axios.post("/api/bookRoom/userInfo/readingInfos/highLights/delete", {
        uid: userInfo.uid,
        bookId: bookId,
        bookMark: {
            id: bookMarkId,
        }
    });
}