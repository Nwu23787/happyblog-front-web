<script setup>
import { loadTeamUserAPI } from "@/api/index.js";
import { onMounted, ref } from "vue";

// 用户列表
const userList = ref([]);

// 获取用户列表
const getUserList = async () => {
  const res = await loadTeamUserAPI();
  userList.value = res;
  console.log(userList.value);
};

onMounted(() => {
  getUserList();
});
</script>

<template>
  <div class="user_main" v-for="item in userList" :key="item.userId">
    <div class="left">
      <el-image
        class="user_cover"
        :src="'/api/file/getImage/' + item.avatar"
        fit="fill"
      >
        <template #error>
          <div class="image-slot">无头像</div>
        </template>
      </el-image>
    </div>
    <div class="right">
      <div class="header">
        <div class="name">{{ item.nickName }}</div>
        <div class="message">
          <span class="job">职位：{{ item.profession }}</span>
          <span> 博客：{{ item.blogCount }}</span>
        </div>
      </div>
      <div class="content" v-html="item.introduction"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user_main {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  overflow: hidden;
  .left {
    display: inline-block;
    width: 20%;
    text-align: center;
    .user_cover {
      height: 200px;
      width: 200px;
      vertical-align: top;
      border-radius: 50%;
    }
  }
  .right {
    float: right;
    width: 80%;
    .header {
      box-sizing: border-box;
      height: 70px;
      margin-top: 30px;
      .name {
        font-weight: bold;
        font-size: 16px;
        color: #4f4f4f;
      }
      .message {
        margin-top: 10px;
        color: #0b1c2c;
        font-size: 14px;
        .job {
          margin-right: 50px;
        }
      }
    }
  }
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>
