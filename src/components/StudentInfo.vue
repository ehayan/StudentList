<template>
  <div>
    <h4>학생 정보 입력</h4>
    <div class="Inputs">
      <h5>이름</h5><input v-model="name" type="text">
      <h5>나이</h5><input v-model="age" type="text">
      <h5>성별</h5>

      <div class="custom-control custom-radio mt-3">
        <input v-model="gender" type="radio" class="custom-control-input" name="gender" value="남" id="man">
        <label class="custom-control-label" for="man">남</label>
      </div>
      <div class="custom-control custom-radio">
        <input v-model="gender" type="radio" class="custom-control-input" name='gender' value="여" id="woman">
        <label class="custom-control-label" for="woman">여</label>
      </div>


      <div class="custom-control custom-radio mt-3">
        <input v-model="grade" type="radio" class="custom-control-input" name="grade" value="A" id="A">
        <label class="custom-control-label" for="A">A</label>
      </div>
      <div class="custom-control custom-radio">
        <input v-model="grade" type="radio" class="custom-control-input" name='grade' value="B" id="B">
        <label class="custom-control-label" for="B">B</label>
      </div>
      <div class="custom-control custom-radio">
        <input v-model="grade" type="radio" class="custom-control-input" name='grade' value="C" id="C">
        <label class="custom-control-label" for="C">C</label>
      </div>


    </div>
    <div>
      {{ name }} : {{ age }} : {{ gender }} : {{grade}}
    </div>
    <button>저장</button>
  </div>
</template>

<script>
export default {
  name: "StudentInfo.vue",
  data() {
    return {
      name: '',
      age: '',
      gender: '남',
      grade: 'A'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.Inputs {
  margin-top: 20px;
}
</style>