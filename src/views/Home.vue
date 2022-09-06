<template>
  <div class="home">
    <router-link to="/studentList">학급리스트</router-link> |
    <router-link to="/class">Class</router-link>

  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  }
}
</script>

<style>
a{
  padding: 20px;
}
</style>
