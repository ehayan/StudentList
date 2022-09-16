<template>
  <div>
    <h4>{{$route.params.grade}}학년 {{$route.params.ban}}반</h4>
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
      db.collection('Students')
          .where('grade', '==', this.$route.params.grade)
          .where('ban', '==', this.$route.params.ban)
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