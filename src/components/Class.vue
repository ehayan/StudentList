<template>
  <div>
    <h4>Class {{$route.params.id}}</h4>
    <router-link to="/studentInfo">등록</router-link>
    <div>
      <mdb-datatable-2 className="card mt-3 p-3 mb-3" v-model="studentData" hover noFoundMessage="데이터가 없습니다"/>
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
        columns: user_columns,
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
          .where('grade', '==', this.$route.params.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['key'] = doc.id;
              self.studentData.rows.push(_data);
            });

          })
    },
  }
}
</script>

<style scoped>
</style>