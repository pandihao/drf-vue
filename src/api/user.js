import request from '../utils/request'

export function login(data) {
    return request({
        url: '/oauth/login/',
        method: 'post',
        data
    })
}

// 获取当前登录用户信息
export function getInfo() {
    return request({
        url: '/oauth/info/',
        method: 'get'
    })
}