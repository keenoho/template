<template>
  <div class="page-demo1">
    <h1>this is demo1</h1>
    <router-link to="/">back to home</router-link>
    <div>
      <button @click="handleShowLoading">show loading</button>
    </div>
    <div>
      <button @click="handleShowMessage">show Message</button>
    </div>
    <div>
      <button @click="handleShowAlert">show alert</button>
    </div>
    <div>
      <button @click="handleShowConfirm">show confirm</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'demo1',
  methods: {
    handleShowLoading() {
      this.$loading({ duration: 3000 });
    },
    handleShowMessage() {
      this.$message({ message: 'hello-' + new Date().getSeconds() });
    },
    handleShowAlert() {
      this.$alert({ message: 'hello-' + new Date().getSeconds() });
    },
    handleShowConfirm() {
      this.$confirm({ message: 'hello-' + new Date().getSeconds() });
    },
  },
};
</script>
