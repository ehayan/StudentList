<template>
  <div>
    <h4>{{ $route.params.grade }}학년 {{ $route.params.ban }}반</h4>
    <button type="button" class="btn btn-info" @click="goToSortList($route.params)">학생 등록</button>
    <button type="button" class="btn btn-secondary" @click="goToClassRevision(id)">학급 수정</button>
    <button type="button" class="btn btn-danger" @click="onDelete">학생 삭제</button>

    <div>
      <mdb-datatable-2 className="card mt-3 p-3 mb-3" v-model="studentData" hover noFoundMessage="데이터가 없습니다"/>
    </div>
  </div>

</template>

<script>
import firebase from "firebase";
import {mdbDatatable2} from 'mdbvue';
import user_columns from "@/data/user_columns";
import axios from "axios";

export default {
  name: "StudentList.vue",
  components: {
    mdbDatatable2
  },
  data() {
    return {
      id: this.$route.query.id,
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
      db.collection('students')
          .where('grade', '==', this.$route.params.grade)
          .where('ban', '==', this.$route.params.ban)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const _data = doc.data();
              _data['id'] = doc.id;
              self.studentData.rows.push(_data);
            });

          })
    },
    goToSortList(value) {
      this.$router.push(`/class/${value.grade}/${value.ban}/list`)
    },
    onDelete() {
      const self = this;
      const _data = JSON.stringify({
        'id': self.id,
      });

      const config = {
        method: 'post',
        url: 'http://127.0.0.1:5001/student-test001/asia-northeast3/deleteClass',
        headers: {
          'Content-Type': 'application/json'
        },
        data: _data
      };

      axios(config)
          .then(res => {
            if (res.data.result === 'success') {
              alert('성공!');
              self.$router.go(-1)
            } else {
              alert('실패ㅜㅜ')
            }
          })
    },
    goToClassRevision() {
      const self = this;
      self.$router.push({name: 'classRevision', params: {id: self.id}})
    }
  }
}
</script>

<style scoped>
</style>