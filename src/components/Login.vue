<template>
  <div>
    <h4>로그인</h4>
    <form type="submit" @submit.prevent="test">
      <div>
        <input type="email" placeholder="ID" v-model="id">
        <input type="password" placeholder="Password" v-model="pw">
      </div>

      <div>
        <button type="button" class="btn btn-info" @click="login">로그인</button>
        <button type="button" class="btn btn-warning" @click="register">회원가입</button>
        <br>

      </div>
    </form>

    <button @click="logout">로그아웃</button>

  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
  name: "Login.vue",
  data() {
    return {
      id: '',
      pw: ''
    }
  },
  methods: {
    register() {
      this.$router.push('/register')
    },
    login() {
      const self = this;
      firebase.auth().signInWithEmailAndPassword(self.id, self.pw)
          .then(() => {
            alert('로그인 성공');
            self.$router.push('/home')
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/user-not-found') {
              alert('등록된 사용자가 없습니다')
            } else if (errorCode === 'auth/invalid-email') {
              alert('유효하지 않은 이메일')
            }
          })
    },
    logout() {
      firebase.auth().signOut();
      alert('로그아웃')
    }
  }
}
</script>
<style scoped>
input {
  margin: 10px;
}
</style>