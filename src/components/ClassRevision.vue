<template>
  <div>
    <h3>학급 수정</h3>
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

      <button type="button" class="btn btn-info" @click="onModify">수정</button>

    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
  name: "ClassRevision",
  data() {
    return {
      id: this.$route.params.id,
      grade: '',
      ban: '',
      admissionYear: '',
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const db = firebase.firestore();
      const _ref = db.collection('classes').doc(`${this.id}`);
      _ref.get()
          .then((doc) => {
            this.grade = doc.data().grade;
            this.ban = doc.data().ban;
            this.admissionYear = doc.data().admissionYear;
          })
    },
    onModify() {
      const self = this;
      const _data = JSON.stringify({
        'id': self.id,
        'grade': self.grade,
        'ban': self.ban,
        'admissionYear': self.admissionYear
      });

      const config = {
        method: 'post',
        url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/updateClass',
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
            } else {
              alert('실패ㅜㅜ')
            }
          })
    }
  }
}
</script>

<style scoped>

</style>