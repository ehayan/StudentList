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
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
      const self = this;

      const _data = JSON.stringify({
        'id':self.id,
        'pw':self.pw,
        'name': self.name,
        'gender': self.gender,
        'birth': self.birth
      });

      const config = {
        method: 'post',
        url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/registerTeacher',
        headers: {
          'Content-Type': 'application/json'
        },
        data: _data
      };

      axios(config)
          .then(res => {
            if (res.data.result === 'success') {
              alert('성공!');
              self.$router.go(-1)
            }
            else {
              alert('실패ㅜㅜ')
            }
          })
      // const db = firebase.firestore();
      // const self = this;
      // firebase.auth().createUserWithEmailAndPassword(this.id, this.pw)
      //     //auth
      //     .then((result) => {
      //       console.log(result.user)
      //       // result.user.displayName = self.name;
      //
      //       alert('회원가입 성공!')
      //
      //       //db
      //       db.collection('teacher')
      //           .add({
      //             id: self.id,
      //             name: self.name,
      //             gender: self.gender,
      //             birth: self.birth
      //           })
      //       this.$router.go(-1)
      //     })
      //     .catch((error) => {
      //           const errorCode = error.code;
      //           console.log(error)
      //           if (errorCode === 'auth/weak-password') {
      //             alert('비밀번호는 최소 6자리 입니다')
      //           }
      //           if (errorCode === 'auth/invalid-email') {
      //             alert('유효하지않은 이메일입니다')
      //           }
      //           if (errorCode === 'auth/email-already-in-use') {
      //             alert('이미 존재하는 이메일입니다')
      //           }
      //         }
      //     )
    }
  }
}
</script>

<style scoped>

</style>