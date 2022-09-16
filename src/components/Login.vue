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


      </div>
    </form>


  </div>
</template>

<script>
import firebase from "firebase";

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
      firebase.auth().signInWithEmailAndPassword(this.id, this.pw)
          .then(() => {
            // const user = userCredential.user;

            alert('로그인 성공');
            this.$router.push('/home')

            // console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/user-not-found') {
              alert('등록된 사용자가 없습니다')
            } else if (errorCode === 'auth/invalid-email') {
              alert('유효하지 않은 이메일')
            }
          })
    }
  }
}
</script>
<style scoped>
input {
  margin: 10px;
}
</style>