<template>
  <div>
    <h4>로그인</h4>

    <input type="email" placeholder="ID" v-model="id">
    <input type="password" placeholder="Password" v-model="pwd">

    <mdb-btn color="primary">로그인</mdb-btn>
    <mdb-btn color="warning" @click="register">회원가입</mdb-btn>
  </div>
</template>

<script>
import {mdbBtn} from 'mdbvue';

export default {
  name: "Login.vue",
  components: {
    mdbBtn
  },
  data() {
    return {
      id: '',
      pwd: ''
    }
  },
  methods:{
    register(){
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>

</style>