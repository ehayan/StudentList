<template>
  <div class="home">
    <router-link to="/studentList">학급리스트</router-link>
    |
    <router-link to="/class">Class</router-link>

    <br>
    <button type="button" class="btn btn-danger" @click="logout">로그아웃</button>

    <button type="button" class="btn btn-dark" @click="registerClass">학급등록</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'home',
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //현재 로그인 한 사람이랑
      //그사람이 등록한 반이 있는지 확인
      //그럼 여기서 등록한 반은 teacher에 업데이트
      //인줄알았으나 바뀜 푸하하..
      // const user = firebase.auth().currentUser;
      // this.user = user.email

      const db = firebase.firestore()
      db.collection('학급전체')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['key'] = doc.id;
              console.log(_data.key)
            });
          })
    },
    registerClass() {
      this.$router.push('/register/class')
    },
    logout() {
      firebase.auth().signOut();
      alert('로그아웃')
      this.$router.replace('/')
    }
  }
}
</script>

<style>
a {
  padding: 20px;
}
</style>
