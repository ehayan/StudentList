import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import studentInfo from "@/components/StudentInfo";
import StudentList from "@/components/StudentList";
import Class from '@/components/Class'
import ClassList from "@/components/ClassList";
import studentRevision from "@/components/StudentRevision";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/studentList',
      name: 'studentList',
      component: StudentList
    },
    {
      path: '/studentInfo',
      name: 'studentInfo',
      component: studentInfo
    },
    {
      path: '/studentRevision',
      name: 'studentRevision',
      component: studentRevision
    },
    {
      path: '/class',
      name: 'class',
      component: ClassList
    },
    {
      path: '/class/:id',
      name: 'class',
      component: Class
    },




  ]
})
