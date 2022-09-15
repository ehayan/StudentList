<template>
  <div>
    <h4>선생님 회원가입</h4>

    <div class="mt-4">
      <label>ID</label>
      <input type="email" placeholder="email" v-model="id">
      <br/>
      <label>PW</label>
      <input type="password" placeholder="password" v-model="pw">
      <br/>
      <label>Name</label>
      <input type="text" placeholder="name" v-model="name">
      <div class="m-3">
        <div class="custom-control custom-radio">
          <input type="radio" class="custom-control-input" name="gender" value="남" id="man" v-model="gender">
          <label class="custom-control-label" for="man">남</label>
        </div>
        <div class="custom-control custom-radio">
          <input type="radio" class="custom-control-input" name='gender' value="여" id="woman" v-model="gender">
          <label class="custom-control-label" for="woman">여</label>
        </div>
      </div>
      <label>Birth</label>
      <input type="date" v-model="birth">
    </div>
    <br/>
    <button @click="onSave">저장</button>
    <div>
      {{ id }} : {{ pw }} : {{ name }} : {{ gender }} : {{ birth }}
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Register.vue",
  data() {
    return {
      id: '',
      pw: '',
      name: '',
      gender: '',
      birth: '',
    }
  },
  methods: {
    onSave() {
      const db = firebase.firestore();
      const self = this;
      firebase.auth().createUserWithEmailAndPassword(this.id, this.pw)
          .then((result) => {
            console.log(result.user)

            alert('회원가입 성공!')
            this.$router.go(-1)
          })
          .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/weak-password') {
              alert('비밀번호는 최소 6자리 입니다')
            }
            if (errorCode === 'auth/invalid-email') {
              alert('유효하지않은 이메일입니다')
            }
          })

      db.collection('teacher')
          .add({
            id: self.id,
            name: self.name,
            gender: self.gender,
            birth: self.birth
          })
    }
  }
}
</script>

<style scoped>

</style>