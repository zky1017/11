import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { isLogin } from '../api/user';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/register',
    },
    {
        path: '/framework',
        name: 'FrameWork',
        redirect: 'home',
        component: () => import("@/views/FrameWork/index.vue"),
        children: [
            {
                path: 'home',
                name: 'Home',
                meta: {
                    title: "首页",
                    keepAlive: true,
                    requireAuth: true
                },
                component: () => import("@/views/Home/index.vue")
            },
            {
                path: 'center',
                name: 'Center',
                meta: {
                    title: "中心",
                    keepAlive: true,
                    requireAuth: true
                },
                component: () => import("@/views/Center/index.vue")
            },
            {
                path: 'add',
                name: 'Add',
                meta: {
                    title: "添加",
                    keepAlive: true,
                    requireAuth: true
                },
                component: () => import("@/views/Add/index.vue")
            }
        ]
    },
    {
        path: '/select',
        name: 'Select',
        meta: {
            title: "选项",
            keepAlive: true,
            requireAuth: true
        },
        component: () => import("@/views/Select/index.vue")
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        meta: {
            title: "选项",
            keepAlive: true,
            requireAuth: true
        },
        component: () => import("@/views/Detail/index.vue")
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: "登录",
            keepAlive: true
        },
        component: () => import("@/views/Login/index.vue")
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: "注册",
            keepAlive: true
        },
        component: () => import("@/views/Register/index.vue")
    },
    {
        path: '/accountdetail',
        name: 'AccountDetail',
        meta: {
            title: "登录",
            keepAlive: true,
            requireAuth: true
        },
        component: () => import("@/views/AccountDetail/index.vue")
    },
    {
        path: '/myalbum',
        name: 'MyAlbum',
        meta: {
            title: "我的专辑",
            keepAlive: true,
            requireAuth: true
        },
        component: () => import("@/views/MyAlbum/index.vue")
    },
    {
        path: '/mycollection',
        name: 'MyCollection',
        meta: {
            title: "我的收藏",
            keepAlive: true,
            requireAuth: true
        },
        component: () => import("@/views/MyCollection/index.vue")
    },
    {
        path: '/myorder',
        name: 'MyOrder',
        meta: {
            title: "我的订单",
            keepAlive: true,
            requireAuth: true
        },
        component: () => import("@/views/MyOrder/index.vue")
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (window.localStorage.getItem('accessToken')) {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
            window.localStorage.clear()
        }
    }
    else {
        next();
    }
})

export default router
