<template>
  <div>
    <h4>반이 정해지지 않은 학생 리스트</h4>
    <router-link to="/register/student">신규 학생 등록</router-link>
    <div class="mt-4">
      <h5>검색</h5>
      <input type="text" placeholder="검색" v-model="searchData" @change="search">

      <mdb-datatable-2 id="studentlist" class="card mt-3 p-3 mb-3" v-model="studentData" hover
                       noFoundMessage="데이터가 없습니다" @selected='onSelected($event)'/>
    </div>
  </div>

</template>

<script>
import {mdbDatatable2} from 'mdbvue';
import user_columns from "@/data/user_columns";
import {firebase} from "@/firebase/firebaseConfig";

export default {
  name: "StudentList.vue",
  components: {
    mdbDatatable2
  },
  data() {
    return {
      searchData:'',
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

      db.collection('Students')
          .where('ban', "==", '-')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['key'] = doc.id;
              self.studentData.rows.push(_data);
            });
          })
    },
    onSelected(value) {
      console.log(value)
      this.$router.push({name: 'studentRevision', params: {id: value.key}})
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