<template>
  <div>
    <h3>학급 등록</h3>

    <form action="">
      <div>
        <label>학년</label>
        <input type="number" placeholder="grade" min="1" max="6" v-model="grade">
      </div>

      <div class="mt-3">
        <label>학급</label>
        <div class="custom-control custom-radio">
          <input type="radio" class="custom-control-input" name="ban" value="A" id="A" v-model="ban">
          <label class="custom-control-label" for="A">A</label>
        </div>
        <div class="custom-control custom-radio">
          <input type="radio" class="custom-control-input" name='ban' value="B" id="B" v-model="ban">
          <label class="custom-control-label" for="B">B</label>
        </div>
        <div class="custom-control custom-radio">
          <input type="radio" class="custom-control-input" name='ban' value="C" id="C" v-model="ban">
          <label class="custom-control-label" for="C">C</label>
        </div>
      </div>

      <div class="mt-3">
        <label>입학년도</label>
        <input type="text" placeholder="year" v-model="admissionYear" maxlength="4">
      </div>

      <button type="button" class="btn btn-info" @click="onClassSave()">등록</button>

    </form>

    <!--    {{ grade }} : {{ ban }} : {{ entrance }}-->
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";

export default {
  name: "RegisterClass.vue",
  data() {
    return {
      teacherEmail: firebase.auth().currentUser.email,
      grade: '',
      ban: '',
      admissionYear: ''
    }
  },
  methods: {
    onClassSave() {
      const self = this;
      const _data = JSON.stringify({
        'teacherEmail': self.teacherEmail,
        'grade': self.grade,
        'ban': self.ban,
        'admissionYear': self.admissionYear
      });

      const config = {
        method: 'post',
        url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/registerClass',
        headers: {
          'Content-Type': 'application/json'
        },
        data: _data
      };

      console.log(_data);

      axios(config)
          .then(res => {
            if (res.data.result === 'success') {
              alert('성공!');
              self.$router.go(-1)
            } else {
              alert('실패ㅜㅜ')
            }
          })
      // //firestore에 접근하기 위한 객체 db
      // const db = firebase.firestore();
      // const user = firebase.auth().currentUser;
      // const self = this;
      // db.collection('ClassList')
      //     .doc(user.uid)
      //     .set({
      //       teacherEmail: user.email,
      //       ban: self.ban,
      //       entrance: self.entrance,
      //       grade: self.grade,
      //     })
      //     .then(() => {
      //       alert('학급 등록 성공')
      //       console.log()
      //       this.$router.push({name: 'home', params: {}})
      //     })
    }
  }
}
</script>

<style scoped>
input {
  width: 120px;
  margin-left: 10px;
}
</style>