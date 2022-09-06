import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ClassList from "@/components/ClassList";
import studentInfo from "@/components/StudentInfo";
import StudentList from "@/components/StudentList";


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
      // component: () => {
      //   import(/* webpackChunkName: "Students" */ './views/StudentListView')
      // }
    },
    {
      path: '/studentInfo',
      name: 'studentInfo',
      component: studentInfo
    },
    {
      path: '/class',
      name: 'class',
      component: ClassList
    },




  ]
})
