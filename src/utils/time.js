import moment from "moment";
export function changeTime(time){
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
}
export function changeTimeNoSecond(time){
    return moment(time).format("YYYY-MM-DD HH:mm");
}