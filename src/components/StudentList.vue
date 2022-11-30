<template>
  <div>
    <h4>반이 정해지지 않은 학생 리스트</h4>
    <router-link to="/register/student">신규 학생 등록</router-link>
    <div class="mt-4">
      <h5>검색</h5>
      <input type="text" placeholder="검색" v-model="searchData" @change="search">

      <mdb-datatable-2 id="studentlist" class="card mt-3 p-3 mb-3"
                       v-model="studentData"
                       hover
                       noFoundMessage="데이터가 없습니다"
                       @selected='onSelected($event)'/>
    </div>
  </div>

</template>

<script>
import {mdbDatatable2} from 'mdbvue';
import user_columns from "@/data/user_columns";
import {firebase} from "@/firebase/firebaseConfig";
// import axios from "axios";

export default {
  name: "StudentList.vue",
  components: {
    mdbDatatable2
  },
  data() {
    return {
      searchData: '',
      studentData: {
        rows: [],
        columns: user_columns
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const self = this;
      const db = firebase.firestore()

      // const config = {
      //   method: 'get',
      //   url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/getStudents',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      // }
      //
      // axios(config)
      //     .then(res => {
      //       if (res.data.result === 'success') {
      //         self.studentData.rows = res.data.data
      //         console.log(self.studentData.rows)//데이터는 들어갔지만 표에서는 안나오네 ㅋㅡㅋ
      //       } else {
      //         console.log('실패')
      //       }
      //     })
      db.collection('students')
          .where('ban', "==", '-')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['id'] = doc.id;
              self.studentData.rows.push(_data);
              console.log(self.studentData.rows)
            });
          })
    },
    onSelected(value) {
      console.log(value)
      this.$router.push({name: 'studentRevision', params: {id: value.id}})
    },

    async search() {
      const self = this;
      const algoliasearch = require("algoliasearch");

      const client = algoliasearch('8624U33LI8', '17952c59911639a12c2ca0b37b8d448c');
      const searchIndex = client.initIndex('test');

      searchIndex
          .search(`${self.searchData}`)
          .then(({hits}) => {
            console.log(hits);
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
}
</script>

<style scoped>
</style>