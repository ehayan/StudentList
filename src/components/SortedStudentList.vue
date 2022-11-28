<template>
  <div>
    <h4>{{this.$route.params.grade}}학년 미지정 학생 리스트</h4>
    <div class="mt-4">
      <mdb-datatable-2 id="studentlist" class="card mt-3 p-3 mb-3"
                       v-model="studentData"
                       hover
                       noFoundMessage="데이터가 없습니다"
                       @selected='onSelected($event)'/>
    </div>
  </div>

</template>

<script>
import firebase from "firebase";
import {mdbDatatable2} from 'mdbvue';
import user_columns from "@/data/user_columns";

export default {
  name: "SortedStudentList.vue",
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
      db.collection('students')
          .where('ban', "==", '-')
          .where('grade', '==', `${this.$route.params.grade}`)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['id'] = doc.id;
              self.studentData.rows.push(_data);
            });
          })
    },
    onSelected(value) {
      console.log(value)
      this.$router.push({name: 'studentRevision', params: {id: value.id}})
    },
  }
}
</script>

<style scoped>
</style>