export function setAuthInfo(setAuth) {
    let username, password, token, uid
    token = localStorage.getItem("token")
    username = localStorage.getItem("username")
    password = localStorage.getItem("password")
    uid = localStorage.getItem("uid")
    if (token && token !== "") {
        setAuth(
            {
                username, password, token, uid
            }
        )
    }
}
export function getDefer() {
    let _resolve;
    let _reject;
    let promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });
    return {
        promise,
        resolve: _resolve,
        reject: _reject,
    };
}
export function makeTreeFromList(list) {
    const newList = []
    const findParent = (parentId) => {
        return list.find(item => item.id == parentId)
    }
    for (let item of list) {
        if (item.parentReplyId == item.reviewId) {
            newList.push(item)
        } else {
            const parent = findParent(item.parentReplyId)
            if (parent.childrent && Array.isArray(parent.childrent)) {
                parent.childrent.push(item)
            } else {
                parent.childrent = [item]
            }
        }
    }
    return newList
}
function fallbackCopyTextToClipboard() {
    // 1.创建一个可选中元素
    let textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    // 2.使用定位，阻止页面滚动
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    // 3.移除元素
    document.body.removeChild(textArea);
}

export function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    return navigator.clipboard.writeText(text)
}
export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
// export function calcFileMD5(file) {
//     return new Promise((resolve, reject) => {
//         let chunkSize = 2097152, // 2M
//             chunks = Math.ceil(file.size / chunkSize),
//             currentChunk = 0,
//             spark = new SparkMD5.ArrayBuffer(),
//             fileReader = new FileReader();

//         fileReader.onload = (e) => {
//             spark.append(e.target.result);
//             currentChunk++;
//             if (currentChunk < chunks) {
//                 loadNext();
//             } else {
//                 resolve(spark.end());
//             }
//         };

//         fileReader.onerror = (e) => {
//             reject(fileReader.error);
//             reader.abort();
//         };

//         function loadNext() {
//             let start = currentChunk * chunkSize,
//                 end = start + chunkSize >= file.size ? file.size : start + chunkSize;
//             fileReader.readAsArrayBuffer(file.slice(start, end));
//         }
//         loadNext();
//     });
// }

export function readFilePart(file, offset, readBytes) {
    let defer = getDefer()
    const fileReader = new FileReader()
    const blob = file.slice(offset * readBytes, readBytes)
    fileReader.readAsArrayBuffer(blob);
    fileReader.onload = function (evt) {
        if (evt.target.error == null) {
            defer.resolve(evt.target.result)
        } else {
            defer.reject()
        }
    }
    return defer.promise
}
export function readFileContent(file) {
    let defer = getDefer()
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = function (evt) {
        if (evt.target.error == null) {

            defer.resolve(evt.target.result)
        } else {
            defer.reject()
        }
    }
    return defer.promise
}
export async function fileToBlob(file) {
    const content = readFileContent(file)
    let blob = new Blob([content], { type: file.type });
    return blob
}

export function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
* 字符串转arrayBuffrt
* @param {*} str 需要转换的字符串
* @returns 返回 arrayBuffer
*/
export function strToArrayBuffer(str) {
    var array = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        array[i] = str.charCodeAt(i);

    }
    return new DataView(array.buffer)
}
export function bin2String(buffer) {
    let d = new DataView(buffer)
    var result = "";
    for (let i = 0; i < buffer.byteLength; i++) {
        result += String.fromCharCode(d.getUint8(i));
    }
    return result;
}
//合并两个arraybuffer，有用
export function concatenate(...arrays) {

    let totalLen = 0;

    for (let arr of arrays)

        totalLen += arr.byteLength;

    let res = new Uint8Array(totalLen)

    let offset = 0

    for (let arr of arrays) {

        let uint8Arr = new Uint8Array(arr)

        res.set(uint8Arr, offset)

        offset += arr.byteLength

    }

    return res.buffer

}
export function downloadArrayBuffer(buffer, fileName) {
    const a = document.createElement('a');
    a.style.display = 'none'
    const url = window.URL.createObjectURL(new Blob([buffer]));
    a.href = url;
    a.download = fileName || "example";
    a.click();
    window.URL.revokeObjectURL(url);
}
export function getSize(bytes) {
    const M = 1024 * 1024;
    if (bytes < M) {
        return (bytes / 1024).toFixed(2) + "KB";
    } else {
        return (bytes / 1024 / 1024).toFixed(2) + "MB";
    }
}
export * from './EventClass'
export function strTimeStampToDate(timestamp) {
    return new Date(Number(timestamp))
}
export function byteToObj(data) {
    var enc = new TextDecoder("utf-8");
    var uint8_msg = new Uint8Array(data);
    return enc.decode(uint8_msg)
}
export function objToByte(data) {
    let defer = getDefer()
    const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
    });
    let file = new FileReader();
    file.onload = function (evt) {
        if (evt.target.error == null) {
            defer.resolve(evt.target.result)
        } else {
            defer.reject(evt.target.error)
        }
    }
    file.readAsArrayBuffer(blob);
    return defer.promise
}
export function hasUserMedia() {
    //check if the browser supports the WebRTC 
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);
}

// if (hasUserMedia()) {
//     navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
//         || navigator.mozGetUserMedia;

//     //enabling video and audio channels 
//     navigator.getUserMedia({ video: true, audio: true }, function (stream) {
//         var video = document.querySelector("video");

//         //inserting our stream to the video tag     
//         video.src = window.URL.createObjectURL(stream);
//     }, function (err) { });
// } else {
//     alert("WebRTC is not supported");
// }
export function getPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let data = {
                    latitude: latitude,
                    longitude: longitude
                }
                resolve(data)
            }, function () {
                reject(arguments)
            })
        } else {
            reject('你的浏览器不支持当前地理位置信息获取')
        }
    })
}
let promises = {}
export function loadScript(src) {
    if (promises[src]) {
        return promises[src]
    }
    let promise = (promises[src] = new Promise(resolve => {
        var el = document.createElement('script')
        var loaded = false
        el.onload = el.onreadystatechange = () => {
            if (
                (el.readyState &&
                    el.readyState !== 'complete' &&
                    el.readyState !== 'loaded') ||
                loaded
            ) {
                return false
            }
            el.onload = el.onreadystatechange = null
            loaded = true
            resolve()
        }

        el.async = true
        el.src = src
        let head = document.getElementsByTagName('head')[0]
        head.insertBefore(el, head.firstChild)
    }))

    return promise
}
export function isMobile() {
    if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
        return true; // 移动端
    } else {
        return false; // PC端
    }
}

// export * from './EventClass'
// export * from './auth'
// export * from './constant'
// export * from './time'
// export * from './useFunc'
// export * from './useLibrary'

export function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL
}

export function getImgBase64FromSrc(src) {
    var img = document.createElement('img');
    img.src = src
    img.crossOrigin = 'anonymous'
    const defer = getDefer()
    img.onload = function () {
        var data = getBase64Image(img);
        defer.resolve(data)
    }
    return defer.promise
}