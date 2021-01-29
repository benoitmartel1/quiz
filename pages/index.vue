<template>
  <div class="container"></div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: false,
      user: {
        email: "",
        password: ""
      }
    };
  }
};
</script>

<style>
.small-box {
  max-width: 50%;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

.el-form-item:last-child {
  margin-bottom: 0;
}
</style>
