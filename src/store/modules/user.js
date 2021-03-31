import { getToekn,setToken ,setUserName} from '@/utils/auth'
import {login,getInfo} from "../../api/user";

const state = {
    token: getToekn(),
    userId: '',
    name: '',
    username: '',
    email: '',
    avatar: '',
    permissions: [],
    department: '',
    mobile: ''
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERID(state, userId) {
        state.userId = userId
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions
    },
    SET_DEPARTMENT: (state, department) => {
        state.department = department
    },
    SET_MOBILE: (state, mobile) => {
        state.mobile = mobile
    }
}


const actions = {
    // 登录
    login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password}).then(response => {
                commit('SET_TOKEN', response.token)
                commit('SET_USERNAME',username)
                setToken(response.token)
                setUserName(username)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 获取当前登录用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                console.log(response);
                const data = response
                if (!data) {
                    reject('验证失败，请重新登录')
                }
                const { id, username, name, avatar, email, permissions, department, mobile } = data
                commit('SET_USERID', id)
                commit('SET_NAME', name)
                commit('SET_USERNAME', username)
                commit('SET_EMAIL', email)
                commit('SET_AVATAR', avatar)
                commit('SET_PERMISSIONS', permissions)
                commit('SET_DEPARTMENT', department)
                commit('SET_MOBILE', mobile)
                resolve(data)
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