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
        <input type="number" placeholder="year" v-model="entrance" min="0000" max="3000">
      </div>

      <button type="button" class="btn btn-info" @click="onClassSave()">등록</button>

    </form>

    {{ grade }} : {{ ban }} : {{ entrance }}
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "RegisterClass.vue",
  data() {
    return {
      teacherEmail: '',
      grade: '',
      ban: '',
      entrance: ''
    }
  },
  methods: {
    onClassSave() {
      //firestore에 접근하기 위한 객체 db
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;
      const self = this;
      db.collection('ClassList')
          .doc(user.uid)
          .set({
            teacherEmail: user.email,
            ban: self.ban,
            entrance: self.entrance,
            grade: self.grade,
          })
          .then(() => {
            alert('학급 등록 성공')
            console.log()
            this.$router.push({name: 'home', params: {}})
          })
    },
    logout() {
      firebase.auth().signOut();
      alert('로그아웃')
    },
  }
}
</script>

<style scoped>
input {
  width: 120px;
  margin-left: 10px;
}
</style>