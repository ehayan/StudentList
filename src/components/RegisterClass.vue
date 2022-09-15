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
        <input type="date" v-model="entrance">
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
      teacher: '',
      grade: '',
      ban: '',
      entrance: ''
    }
  },
  mounted() {
    const user = firebase.auth().currentUser;
    this.teacher = user.email
  },
  methods: {
    onClassSave() {
      const db = firebase.firestore();
      const self = this;
      db.collection('학급전체')
          .add({
            teacher: self.teacher,
            grade: self.grade,
            ban: self.ban,
            entrance: self.entrance
          })
          .then(() => {
            alert('학급 등록 성공')
            console.log()
            this.$router.push({name: 'home', params: {}})
          })
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