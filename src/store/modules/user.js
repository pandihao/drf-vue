import { getToekn,setToken } from '@/utils/auth'
import {login} from "../../api/user";

const state = {
    token: getToekn()
    // userId: '',
    // name: '',
    // username: '',
    // email: '',
    // avatar: '',
    // permissions: [],
    // department: '',
    // mobile: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    }
}


const actions = {
    // 登录
    login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password}).then(response => {
                commit('SET_TOKEN', response.token)
                setToken(response.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}