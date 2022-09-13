<template>
  <div>
    <h4>학생 리스트</h4>
    <router-link to="/studentInfo">등록</router-link>
    <div>
      <mdb-datatable-2 class="card mt-3 p-3 mb-3" v-model="studentData" hover noFoundMessage="데이터가 없습니다"/>
    </div>
  </div>

</template>

<script>
import firebase from "firebase";
import {mdbDatatable2} from 'mdbvue';
import user_columns from "@/data/user_columns";

export default {
  name: "StudentList.vue",
  components: {
    mdbDatatable2
  },
  data() {
    return {
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
      db.collection('school')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              self.studentData.rows.push(_data);
            });

          })
    },
    // onUpdateData() {
    //   const db = firebase.firestore();
    //   // const self = this;
    //   db.collection('school')
    //       .get()
    //       .then((result) => {
    //         result.forEach((doc) => {
    //           console.log(doc.data());
    //         })
    //       });
    // }
  }
}
</script>

<style scoped>
</style>