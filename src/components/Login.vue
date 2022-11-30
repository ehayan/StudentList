<template>
  <div>
    <h4>로그인</h4>
    <form type="submit" @submit.prevent="test">
      <div>
        <input type="email" placeholder="ID" v-model="id">
        <input type="password" placeholder="Password" v-model="pw">
      </div>

      <div>
        <button type="button" class="btn btn-info" @click="login">로그인</button>
        <button type="button" class="btn btn-warning" @click="register">회원가입</button>
        <br>

      </div>
    </form>

    {{msg | capitalize}}
    {{money |money}}
    <br>
    <button @click="logout">로그아웃</button>

  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";

export default {
  name: "Login.vue",
  filters:{ //텍스트 형식화, '|'로 사용, 여러개 적용가능 -> 돈 표기법, 날짜 형식으로 포멧팅 등
    capitalize(value) {
      if(!value) return "";
      return value.toUpperCase();
      // value = value.toString();
      // return value.charAt(0).toUpperCase() + value.slice(1)
    },
    money(value){
      if(!value) return "";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  data() {
    return {
      id: '',
      pw: '',
      msg: 'hello! hi~',
      money: 1234567890
    }
  },
  // mounted() {
  // console.log(firebase.auth().currentUser)//firebase는 회원가입하고 바로 로그인 시킴
  // },
  methods: {
    register() {
      this.$router.push('/register')
    },
    login() {
      const self = this;
      firebase.auth().signInWithEmailAndPassword(self.id, self.pw)
          .then(() => {
            alert('로그인 성공');
            self.$router.push('/home')

              const _data = JSON.stringify({
                'id': self.id,
              });

            const config = {
              method: 'post',
              url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/getlogin',
              headers: {
                'Content-Type': 'application/json'
              },
              data: _data
            }

            axios(config)
                .then(res => {
                  localStorage.token = JSON.stringify(res.data);
                  self.$router.push('/home');
                })
                .catch(() => {
                  alert('로그인 실패ㅜㅜ')
                })

          })
          .catch((error) => {
            console.log(error.code)
          })
    },
    // getLogin() {
    //   const self = this;
    //
    //   const _data = JSON.stringify({
    //     'id': self.id,
    //     'password': self.pw,
    //   });
    //   const config = {
    //     method: 'post',
    //     url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/getlogin',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: _data
    //   }
    //
    //   axios(config)
    //       .then(res => {
    //         localStorage.token = JSON.stringify(res.data);
    //         self.$router.push('/home');
    //       })
    //       .catch(() => {
    //         alert('로그인 실패ㅜㅜ')
    //       })
    // },
    logout() {
      firebase.auth().signOut();
      alert('로그아웃')
    }
  }
}
</script>
<style scoped>
input {
  margin: 10px;
}
</style>