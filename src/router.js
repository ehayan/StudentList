import Vue from 'vue'
// import Router from 'vue-router'
import VueRouter from "vue-router";
import Home from './views/Home.vue'
import RegisterStudent from "@/components/RegisterStudent";
import StudentList from "@/components/StudentList";
import studentRevision from "@/components/StudentRevision";

import Login from '@/components/Login.vue'
import RegisterTeacher from "@/components/RegisterTeacher";
import RegisterClass from "@/components/RegisterClass";

import Class from "@/components/Class";
import SortedStudentList from "@/components/SortedStudentList";
import classRevision from "@/components/ClassRevision";
import store from "@/store";


// Vue.use(Router)
Vue.use(VueRouter)

// export default new VueRouter({
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterTeacher
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {authRequired : true}
        },
        {
            path: '/register/class',
            name: 'registerClass',
            component: RegisterClass,
            meta: {authRequired : true}
        },
        {
            path: '/studentList',
            name: 'studentList',
            component: StudentList,
            meta: {authRequired : true}
        },
        {
            path: '/register/student',
            name: 'registerStudent',
            component: RegisterStudent,
            meta: {authRequired : true}
        },
        {
            path: '/studentRevision',
            name: 'studentRevision',
            component: studentRevision,
            meta: {authRequired : true}
        },
        {
            path: '/classRevision',
            name: 'classRevision',
            component: classRevision,
            meta: {authRequired : true}
        },
        {
            path: '/class/:grade/:ban',
            name: 'class',
            component: Class,
            meta: {authRequired : true}
        },
        {
            path: '/class/:grade/:ban/list',
            name: 'sortStudent',
            component: SortedStudentList,
            meta: {authRequired : true}
        },
    ]
})
router.beforeEach(async (to, from, next) => {
    let token = null;
    if (localStorage.token !== undefined) {
        token = JSON.parse(localStorage.token);
    }
    await store.dispatch('setAuth', token)
        .then(() => {
            if (token) {
                console.log('있다')
                console.log(token)
            } else {
                console.log('없다')
            }
        })

    if (to.meta.authRequired) {
        if (!token) {
            console.log('토근 없음!')
            await router.replace({path: '/'}).catch(() => true)
        }
    } else {
        if (token) {
            if (to.path !== '/home' && to.path !== '/pages/error-404')
                await router.replace({path: '/home'}).catch(() => true)
        }
    }
    next()
})

export default router;