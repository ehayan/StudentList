<template>
  <div class="home">
    <router-link to="/studentList">학생리스트</router-link>

    <br>
    <button type="button" class="btn btn-primary mt-3 mb-5" v-for="(schoolClass, i) in classList" :key="i">{{classList[i].grade}}학년 {{classList[i].ban}}반</button>
    <br>
    <button type="button" class="btn btn-dark" @click="registerClass">학급등록</button>
    <br>
    <button type="button" class="btn btn-danger mt-3" @click="logout">로그아웃</button>

  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'home',
  mounted() {
    this.init();
  },
  data(){
    return{
     classList: []
    }
  },
  methods: {
    init() {
      const db = firebase.firestore();
      db.collection('ClassList')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['key'] = doc.id
              this.classList.push(_data)
              // console.log(_data.key)//입학년도-학년-반
              // console.log(_data)
            });
          })
    },
    logout() {
      firebase.auth().signOut();
      alert('로그아웃')
      this.$router.replace('/')
    },
    registerClass() {
      this.$router.push('/register/class')
    },
  }
}
</script>

<style>
a {
  padding: 20px;
}
</style>
