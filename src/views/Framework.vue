<script setup>
import { onMounted, ref } from "vue";
import { getSysInfoAPI } from "@/api/index.js";
import { useRoute, useRouter } from "vue-router";

const sysSetting = ref({});

const getSysInfo = async () => {
  const res = await getSysInfoAPI();
  sysSetting.value = res;
  console.log(res);
};

const route = useRoute();
const router = useRouter();

onMounted(() => {
  console.log(route);
  getSysInfo();
});

const toManage = () => {
  window.open("http://www.happyblog.asia:8010");
};
</script>

<template>
  <el-scrollbar height="100vh">
    <div class="main">
      <el-affix>
        <el-menu
          :default-active="'/' + route.fullPath.split('/')[1]"
          mode="horizontal"
          style="padding-left: 5%; margin-bottom: 10px"
          router
        >
          <img
            src="@/assets/title.png"
            alt="HappyBlog logo"
            class="title_img"
            @click="router.push('/')"
          />
          <el-menu-item index="/blog">博客</el-menu-item>
          <el-menu-item index="/category">分类专栏</el-menu-item>
          <el-menu-item index="/special">专题</el-menu-item>
          <el-menu-item index="/users">成员</el-menu-item>
          <el-menu-item index="/message">留言板</el-menu-item>
          <el-menu-item @click="toManage">管理端</el-menu-item>
        </el-menu>
      </el-affix>
      <div class="body">
        <router-view :key="route.params.id"></router-view>
      </div>
      <div class="copyright" v-if="sysSetting.showIcp">
        <p>
          ©2023-2024 {{ sysSetting.icpDomain }} All rights reserved.
          <a href="https://beian.miit.gov.cn/">
            {{ sysSetting.policeProvince }}ICP备{{ sysSetting.icpNo }}
          </a>
        </p>
        <p>
          <img src="../assets/备案图标.png" alt="" />

          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=34180202000582"
            rel="noreferrer"
            target="_blank"
          >
            {{ sysSetting.policeProvince }}公网安备
            {{ sysSetting.policeNo }}号</a
          >
        </p>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.main {
  background-color: #f1f1f1;
  min-height: 100vh;
  padding-bottom: 90px;
  box-sizing: border-box;
  position: relative;
  .title_img {
    height: 40px;
    margin-top: 5px;
    margin-right: 30px;
    cursor: pointer;
  }

  .body {
    width: 90vw;
    // height: 1000px;
    // background-color: #eb5d5d;
    margin: 0 auto;
  }
  .copyright {
    text-align: center;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    color: #464646;
    a {
      color: #464646;
    }
    img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
</style>
