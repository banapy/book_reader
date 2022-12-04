import {
    atom, DefaultValue, selector
} from 'recoil';
import axios from '../api/axios';

export const authAtom = atom({
    key: "auth",
    default: {
        token: "",
        name: "",
        uid: "",
        mail: "",
        isLogin: false,
        userInfo: null
    },
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            const savedValue = localStorage.getItem("userInfo")
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }
            onSet(newValue => {
                if (newValue instanceof DefaultValue) {
                    localStorage.removeItem("userInfo");
                } else {
                    localStorage.setItem("userInfo", JSON.stringify(newValue));
                }
            });
        },
    ]
});
// export const userInfoAtom = selector({
//     key: "userInfo",
//     default: {
//         bookRoomName: "聊斋",
//     },
//     get: async ({ get }) => {
//         let a = get(authAtom)
//         console.log(a)
//         if (a.uid == "") return new DefaultValue()
//         return axios.get("/auth/bookRoom/userInfo/" + a.uid).then(res => {
//             if (res.data.code == 0) {
//                 return res.data.data
//             } else {
//                 return new DefaultValue()
//             }
//         })
//     },
// })
