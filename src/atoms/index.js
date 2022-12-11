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
        email: "",
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
