import { useEffect } from "react";
import { userAtom } from "../atoms/index";
import { useRecoilState } from "recoil";
import { getUserInfo } from "../api/user";
// import { Tooltip } from 'bootstrap'
export function useTooltip() {
    useEffect(() => {
        setTimeout(() => {
            // const { Tooltip } = require("bootstrap")
            var tooltipTriggerList = Array.prototype.slice.call(
                document.querySelectorAll('[data-bs-toggle="tooltip"]')
            );
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }, 100);
    }, [])
}
export function useUser() {
    const [user, setUser] = useRecoilState(userAtom)
    const token = localStorage.getItem("token")
    const uid = localStorage.getItem("uid")
    useEffect(() => {
        if (token != "" && user.uid == "") {
            getUserInfo(uid).then(res => {
                if (res.data.code == 0) {
                    setUser(res.data.data)
                }
            })
        }
    })
    return user
}