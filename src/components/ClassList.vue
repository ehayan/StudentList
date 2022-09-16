<!--<template>-->
<!--  <div>-->
<!--&lt;!&ndash;$route.params.작명 => /:작명&ndash;&gt;-->
<!--    <h4>ClassList</h4>-->
<!--    <mdb-datatable-2 id="studentlist" class="card mt-3 p-3 mb-3" v-model="studentData" hover-->
<!--                     noFoundMessage="데이터가 없습니다" @selected='onSelected($event)'/>-->

<!--    <br>-->
<!--    <button type="button" class="btn btn-dark" @click="registerClass">학급등록</button>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import firebase from "firebase";-->
<!--export default {-->
<!--  name: "ClassList.vue",-->
<!--  mounted() {-->
<!--    this.init();-->
<!--  },-->
<!--  methods:{-->
<!--    init() {-->
<!--      const db = firebase.firestore();-->
<!--      db.collection('학급전체')-->
<!--          .get()-->
<!--          .then((querySnapshot) => {-->
<!--            querySnapshot.forEach((doc) => {-->
<!--              const _data = doc.data();-->
<!--              _data['key'] = doc.id;-->
<!--              console.log(_data.key)-->
<!--            });-->
<!--          })-->
<!--    },-->
<!--    registerClass() {-->
<!--      this.$router.push('/register/class')-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->