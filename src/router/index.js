import {createRouter, createWebHistory} from "vue-router";
import store from '../store'
import {getToekn} from "../utils/auth";
import Home from "../views/Home.vue";
import LdapApi from "../views/LdapApi";

export  const constantRoutes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import (
                /* webpackChunkName: "dashboard" */
                "../views/Dashboard.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */
                '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */
                '../views/403.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import (
        /* webpackChunkName: "login" */
        "../views/Login.vue")

    }
];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: constantRoutes
});


export const asyncRoutes =[
    {
        path: "/system",
        name: "system",
        component: Home,
        meta: {
            permissions: ['admin', 'system'],
            title: '系统管理',
            icon: 'system'
        },
        children: [
            {
                path: '/ldap',
                name: 'ladpapi',
                component: LdapApi,
                meta: {
                    permissions: ['admin', 'ldap-user'],
                    title: '系统管理',
                    icon: 'system'
                }
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: '找不到页面'
        },
        component: () => import (/* webpackChunkName: "404" */
            '../views/404.vue')
    }
]
// router.addRoute({
//         path: "/system",
//         name: "system",
//         component: Home,
//         meta: {
//             permissions: ['admin', 'system'],
//             title: '系统管理',
//             icon: 'system'
//         }})
// router.addRoute('system',{
//     path: '/ldap',
//     name: 'ladpapi',
//     component: () => import('../views/LdapApi.vue'),
//     meta: {
//         permissions: ['admin', 'ldap-user'],
//         title: '系统管理',
//         icon: 'system'
//     }
// })
router.beforeEach(async(to, from, next) => {
    const token = getToekn()
    // const username = getUserName()

    // document.title = `${to.meta.title} | vue-manage-system`;

    // console.log(this.$router.path);
    if (token){
        if (to.path === '/login') {
            // 如果已登录，请重定向到主页
            next({ path: '/' })
        }else {
            // console.log(store.getters.userId);
            const hasUserIds = store.getters.userId && store.getters.userId > 0
            if(hasUserIds){
                console.log('hasUserIds');
                console.log(router.currentRoute.value.fullPath)
                next();
            }else {
                const accessRoutes = await store.dispatch('permission/generateRoutes')
                console.log('accessRoutes');
                console.log(accessRoutes);
                // router.addRoute(asyncRoutes)
                console.log(router.getRoutes());
                accessRoutes.forEach(route => {
                    if (route.children && route.children.length > 0){
                        router.addRoute({name:route.name,path:route.path,component:route.component,meta:route.meta})
                        route.children.forEach(childRoute =>{
                            router.addRoute(route.name,childRoute)
                        })
                    }else {
                        router.addRoute(route)
                    }
                })
                // accessRoutes.forEach(route => {
                //     router.addRoute(route)
                // })
                next({ ...to ,replace:true})
            }
        }
    }else {
        if ( to.path !== '/login') {
            console.log(' entry login')
            next('/login');
        }else {
            console.log(router.getRoutes())
            next()
        }
    }
});

export default router;