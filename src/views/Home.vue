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
    // const user = firebase.auth().currentUser
    // console.log(user)
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
      db.collection('classes')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['key'] = doc.id

              if (_data.teacherEmail === self.email) {
                self.classList.push(_data)
              }
              // console.log(self.classList)

              // console.log(_data)
              // console.log(this.classList.forEach((element) => console.log(element.key)))
            });
          })

      self.email = firebase.auth().currentUser.email;
      firebase.auth().onAuthStateChanged((user) => {
        this.uid = user.uid
        console.log(this.uid)
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
    goToStudents() {
      this.$router.push('studentList')
    },
    goToClass(value) {
      // console.log(value)
      this.$router.push(`/class/${value.grade}/${value.ban}`)
    }
  }
}
</script>

<style>
a {
  padding: 20px;
}
</style>
