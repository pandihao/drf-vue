
const tokenKey = 'userToken'
const userNameKey = 'userName'

export function setToken(token) {
    localStorage.setItem(tokenKey,token)
}

export function getToekn() {
    return localStorage.getItem(tokenKey)
}

export function setUserName(username) {
    localStorage.setItem(userNameKey,username)

}

export function getUserName() {
    return localStorage.getItem(userNameKey)

}