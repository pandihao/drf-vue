import {createRouter, createWebHistory} from "vue-router";
import store from '../store'
import {getToekn} from "../utils/auth";
import Home from "../views/Home.vue";

export  const routes = [
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
                path: "/table",
                name: "basetable",
                meta: {
                    title: '表格'
                },
                component: () => import (
                /* webpackChunkName: "table" */
                "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import (
                /* webpackChunkName: "charts" */
                "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import (
                /* webpackChunkName: "form" */
                "../views/BaseForm.vue")
            },
            {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import (
                /* webpackChunkName: "permission" */
                "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import (
                /* webpackChunkName: "i18n" */
                "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import (
                /* webpackChunkName: "upload" */
                "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import (
                /* webpackChunkName: "icon" */
                "../views/Icon.vue")
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
    routes
});


export  const asyncRoutes = [
    {
        path: '/ldap',
        name: 'Ldapapi',
        component: () => import('../views/LdapApi.vue'),
        meta: {
            title: 'ldap'
        },
    }
]
// router.addRoute(about)
console.log(router.getRoutes())
router.beforeEach((to, from, next) => {
    const token = getToekn()
    // const username = getUserName()

    // document.title = `${to.meta.title} | vue-manage-system`;

    // console.log(this.$router.path);
    if (token){
        if (to.path === '/login') {
            // 如果已登录，请重定向到主页
            next({ path: '/' })
        }else {
            console.log(store.getters.userId);
            const hasUserIds = store.getters.userId && store.getters.userId > 0
            if(hasUserIds){
                console.log('hasUserIds');
                console.log(router.currentRoute.value.fullPath)
                next();
            }else {
                store.dispatch('user/getInfo')
                    .then(res =>{
                        router_arr.forEach(
                            function (route){
                                const tmp ={...route}
                                console.log(tmp)
                                router.addRoute(route)
                            }
                        )
                        next({ ...to ,replace:true})
                        console.log(res)
                        console.log(router.getRoutes())
                    })
                    }
                    //     router.addRoute(about)
                    //     next({ ...to ,replace:true})
                    //     console.log(` res path `);
                    //     console.log(router.currentRoute.value.fullPath);
                    //     console.log(res);
                    //     console.log(router.getRoutes())
                    // })
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