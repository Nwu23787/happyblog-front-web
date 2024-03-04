<script setup>
const fn = () => {
  window.location = "https://support.qq.com/product/638164";
};
</script>

<template>
  <div class="message_main">
    <el-button type="primary" class="btn" @click="fn">我要留言</el-button>
  </div>
</template>

<style scoped lang="scss">
.message_main {
  width: 100%;
  background-color: #fff;
  height: 100px;
  position: relative;
  transform: translate();
  .btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
