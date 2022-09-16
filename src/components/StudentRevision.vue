<template>
  <div>
    <h4>정보 수정 / 삭제</h4>

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

      <div class="mt-3">
        <h5>학급</h5>
        <div class="custom-control custom-radio mt-3">
          <input v-model="ban" type="radio" class="custom-control-input" name="ban" value="A" id="A">
          <label class="custom-control-label" for="A">A</label>
        </div>
        <div class="custom-control custom-radio">
          <input v-model="ban" type="radio" class="custom-control-input" name='ban' value="B" id="B">
          <label class="custom-control-label" for="B">B</label>
        </div>
        <div class="custom-control custom-radio">
          <input v-model="ban" type="radio" class="custom-control-input" name='ban' value="C" id="C">
          <label class="custom-control-label" for="C">C</label>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-warning" @click="onUpdateData">수정</button>
    <button type="button" class="btn btn-danger" @click="onDeleteData">삭제</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "StudentRevision",
  data() {
    return {
      key: this.$route.params.id,
      name: '',
      age: '',
      gender: '',
      grade: '',
      ban: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const db = firebase.firestore();
      const _ref = db.collection('Students').doc(`${this.key}`);
      _ref.get()
          .then((doc) => {
            // console.log(doc.data())
            this.name = doc.data().name;
            this.age = doc.data().age;
            this.gender = doc.data().gender;
            this.grade = doc.data().grade;
            this.ban = doc.data().ban;
          })

    },
    onUpdateData() {
      const db = firebase.firestore();
      const self = this;
      const _ref = db.collection('Students').doc(`${this.key}`);
      _ref.update({
        name: self.name,
        age: self.age,
        gender: self.gender,
        grade: self.grade,
        ban : self.ban
      })
          .then(() => {
            alert('수정 완료')
            this.$router.go(-1);
          })
          .catch((error) =>
              console.log('error발생', error))
    },
    onDeleteData() {
      const db = firebase.firestore();
      db.collection('school')
          .doc(this.key)
          .delete()
          .then(() => {
            alert('삭제 완료')
          })
          .catch((error) => {
            console.log('ERROR!', error);
          })
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 30px;
}
</style>