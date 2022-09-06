<template>
  <div>
    <h4>학생 리스트</h4>
    <router-link to="/studentInfo">등록</router-link>
    <div>
      <mdb-tbl hover>
        <mdb-tbl-head>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body >
          <tr>
            <th>1</th>
            <td>홍길동</td>
            <td>20</td>
            <td>남</td>
          </tr>
        </mdb-tbl-body>
      </mdb-tbl>
    </div>

  </div>

</template>

<script>
import {mdbTbl, mdbTblHead, mdbTblBody} from 'mdbvue';

export default {
  name: "StudentList.vue",
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody
  }
}
</script>

<style scoped>
</style>