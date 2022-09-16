<template>
  <div>
    <h4>학생 추가</h4>
    <div class="Inputs">
      <h5 class="mt-3">이름</h5><input v-model="name" type="text">
      <h5 class="mt-3">나이</h5><input v-model="age" type="text">
      <div class="mt-3">
        <h5>성별</h5>
        <div class="custom-control custom-radio mt-3">
          <input v-model="gender" type="radio" class="custom-control-input" name="gender" value="남" id="man">
          <label class="custom-control-label" for="man">남</label>
        </div>
        <div class="custom-control custom-radio">
          <input v-model="gender" type="radio" class="custom-control-input" name='gender' value="여" id="woman">
          <label class="custom-control-label" for="woman">여</label>
        </div>
      </div>

      <div class="mt-3">
        <h5>학년</h5>
        <input type="number" min="1" max="6" v-model="grade">
      </div>
    </div>
    <button @click="onAddData">저장</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "RegisterStudent.vue",
  data() {
    return {
      name: '',
      age: '',
      gender: '',
      grade: '',
      ban: '',
    }
  },
  methods: {
    onAddData() {
      const db = firebase.firestore();
      const self = this;
      db.collection('Students')
          .add({
            name: self.name,
            age: self.age,
            gender: self.gender,
            grade: self.grade,
            ban: '-'
          })
          .then(() => {
            alert('등록성공')
            this.$router.go(-1);
          })
    }
  }
}
</script>

<style scoped>
.Inputs {
  margin-top: 20px;
}
</style>