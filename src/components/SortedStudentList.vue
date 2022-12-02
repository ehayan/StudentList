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
// import firebase from "firebase";
import {mdbDatatable2} from 'mdbvue';
import user_columns from "@/data/user_columns";
import axios from "axios";

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
      const _data = JSON.stringify({
        'grade': self.$route.params.grade,
        'ban': '-'
      });

      const config = {
        method: 'post',
        url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/getSortedStudents',
        headers: {
          'Content-Type': 'application/json'
        },
        data: _data
      };

      axios(config)
          .then(res => {
            if (res.data.result === 'success') {
              self.studentData.rows.push(...res.data.data)
            } else {
              alert('실패ㅜㅜ')
            }
          })
      // const db = firebase.firestore()
      // db.collection('students')
      //     .where('ban', "==", '-')
      //     .where('grade', '==', `${this.$route.params.grade}`)
      //     .get()
      //     .then((querySnapshot) => {
      //       querySnapshot.forEach((doc) => {
      //         const _data = doc.data();
      //         _data['id'] = doc.id;
      //         self.studentData.rows.push(_data);
      //       });
      //     })
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