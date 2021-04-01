// import { asyncRoutes, constantRoutes } from '@/router'
import { asyncRoutes, constantRoutes } from "../../router";
import store from  "../../store"
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(permissions, route) {
    if (route.meta && route.meta.permissions) {
        return permissions.some(permission => route.meta.permissions.includes(permission))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, permissions) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, permissions)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }) {
        return new Promise(resolve => {
            console.log('generate' +asyncRoutes);
            store.dispatch('user/getInfo').then(res => {
                    const accessedRoutes = filterAsyncRoutes(asyncRoutes, res.permissions)
                    commit('SET_ROUTES', accessedRoutes)
                    resolve(accessedRoutes)
                })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
