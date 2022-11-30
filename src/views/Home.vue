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
import swal from "sweetalert2";
import axios from "axios";

export default {
  name: 'home',
  mounted() {
    this.init();
  },
  data() {
    return {
      email: this.$store.state.token.email,
      classList: [],
    }
  },
  methods: {
    init() {
      const self = this;
      const _data = JSON.stringify({
        email: self.email
      });

      const config = {
        method: 'post', //get이면 데이터를 보낼 수가 없구나 post로 바꾸니까 바로 됨 ㄷㄷ
        url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/getClasses',
        headers: {
          'Content-Type': 'application/json'
        },
        data: _data
      }

      axios(config)
          .then(res => {
            if (res.data.result === 'success') {
              self.classList = res.data.data
            } else {
              console.log('실패')
            }
          })
      // const db = firebase.firestore();
      // db.collection('classes')
      //     .where('teacherEmail', '==', self.email)
      //     .get()
      //     .then((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //         const _data = doc.data();
      //         _data['id'] = doc.id
      //
      //         self.classList.push(_data)
      //       });
      //     })
    },
    logout() {
      const self = this;
      swal.fire({
        title: '로그아웃 할까요?',
        text: "확인을 누르시면 로그아웃 합니다!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          firebase.auth().signOut();
          swal.fire('로그아웃', '로그아웃 되었습니다', 'success')
              .then(() => {
                delete localStorage.token;
                self.$router.replace({path: '/'}).catch(() => true)
              })
        }
      })
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
