<template>
  <div class="home">
    <span v-for="(schoolClass, i) in classList" :key="i">
      <button type="button" class="btn btn-primary mt-3 mb-5"
              @click="goToClass(schoolClass)">{{ classList[i].grade }}학년 {{ classList[i].ban }}반
      </button>
    </span>
    <br>
    <button type="button" class="btn btn-tertiary" data-mdb-ripple-color="light" @click="goToStudents">학생리스트</button>
    <button type="button" class="btn btn-dark" @click="registerClass">학급등록</button>
    <br>
    <button type="button" class="btn btn-danger mt-5" @click="logout">로그아웃</button>

  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'home',
  mounted() {
    this.init();
  },
  data() {
    return {
      classList: [],
    }
  },
  methods: {
    init() {
      const self = this;
      const db = firebase.firestore();
      self.email = firebase.auth().currentUser.email;

      db.collection('classes')
          .where('teacherEmail', '==', self.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['id'] = doc.id

              self.classList.push(_data)
            });
          })
      // firebase.auth().onAuthStateChanged((user) => {
      //   this.uid = user.uid
      //   console.log(this.uid)
      // })
    },
    logout() {
      firebase.auth().signOut();
      alert('로그아웃')
      this.$router.replace('/')
    },
    registerClass() {
      this.$router.push('/register/class')// == this.$router.push('registerClass')
    },
    goToStudents() {
      this.$router.push('studentList')
    },
    goToClass(value) {
      // console.log(value)
      this.$router.push({
        path: `/class/${value.grade}/${value.ban}`,
        query: {id: value.id}
      })
    }
  }
}
</script>

<style>
a {
  padding: 20px;
}
</style>
