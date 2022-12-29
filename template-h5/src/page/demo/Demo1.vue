<template>
  <div class="page-demo1">
    <h1>this is demo1</h1>
    <router-link to="/">back to home</router-link>
    <button @click="handleShowLoading">show loading</button>
  </div>
</template>
<script>
export default {
  name: 'demo1',
  methods: {
    handleShowLoading() {
      this.$loading()
    }
  }
};
</script>
