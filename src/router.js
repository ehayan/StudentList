import Vue from 'vue'
import Router from 'vue-router'
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


Vue.use(Router)

export default new Router({
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
      component: Home
    },
    {
      path: '/register/class',
      name: 'registerClass',
      component: RegisterClass
    },
    {
      path: '/studentList',
      name: 'studentList',
      component: StudentList
    },
    {
      path: '/register/student',
      name: 'registerStudent',
      component: RegisterStudent
    },
    {
      path: '/studentRevision',
      name: 'studentRevision',
      component: studentRevision
    },
    {
      path: '/classRevision',
      name: 'classRevision',
      component: classRevision
    },
    {
      path: '/class/:grade/:ban',
      name: 'class',
      component: Class
    },
    {
      path: '/class/:grade/:ban/list',
      name: 'sortStudent',
      component: SortedStudentList
    },




  ]
})
