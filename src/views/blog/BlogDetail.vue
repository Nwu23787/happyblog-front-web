<script setup>
import { useRoute, useRouter } from "vue-router";
import { getBlogDetailAPI, loadCategoryAPI } from "@/api/index.js";
import { onMounted, ref, nextTick } from "vue";
import AsideList from "@/components/AsideList.vue";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";

const route = useRoute();
const router = useRouter();

// 分类列表
const categoryList = ref([]);
// 博客详情
const blogDetail = ref({});

// 目录列表
const catalogList = ref([]);

// 创建目录
const createCatalogList = () => {
  // 要寻找的目标标签
  const aimTags = ["H1", "H2", "H3", "H4", "H5", "H6"];
  let contentDom = document.querySelector("#article_content");
  const childNodes = contentDom.childNodes;
  console.log(childNodes);
  let index = 0;
  childNodes.forEach((node) => {
    if (aimTags.includes(node.nodeName.toUpperCase())) {
      // 加入锚点
      node.setAttribute("id", "anchor_" + index);
      node.classList.add("firsta");
      // 加入目录数组
      catalogList.value.push({
        id: "anchor_" + index,
        title: node.innerText,
        level: node.nodeName.slice(1),
      });
      index++;
    }
  });
  console.log(catalogList);
};

const getBlogDetail = async () => {
  const res = await getBlogDetailAPI(route.params.id);
  blogDetail.value = res;
  console.log(res);
  nextTick(() => {
    let blocks = document.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
    createCatalogList();
  });
};

// 获取分类
const getCategoryList = async () => {
  const res = await loadCategoryAPI();
  // 只展示前五篇
  categoryList.value = res.slice(0, 4);
  console.log(res);
};

onMounted(() => {
  getBlogDetail();
  getCategoryList();
});
</script>

<template>
  <el-container class="body">
    <el-main class="main">
      <h1 class="title">{{ blogDetail.title }}</h1>
      <div class="message">
        <span class="time">{{ blogDetail.createTime }}</span>
        <span
          >作者：<a class="blueText" @click="router.push('/users')">{{
            blogDetail.nickName
          }}</a></span
        >
        <span
          >分类专栏：<a
            class="blueText"
            @click="router.push('/category/' + blogDetail.categoryId)"
            >{{ blogDetail.categoryName }}</a
          ></span
        >
        <span v-if="blogDetail.reprintUrl"
          >转载自：<a class="blueText" :href="blogDetail.reprintUrl"
            >点击查看原文</a
          ></span
        >
        <span v-else>原创文章</span>
      </div>
      <div v-html="blogDetail.content" id="article_content"></div>
    </el-main>
    <el-affix :offset="70" style="width: 25%">
      <el-aside class="aside">
        <!-- 目录结构 -->
        <div class="catalog">
          <div class="header">
            <span class="aside_title">目录结构</span>
            <hr />
          </div>
          <div class="body">
            <div v-if="catalogList.length">
              <a
                class="catalog_item"
                v-for="item in catalogList"
                :key="item.id"
                :style="'padding-left:' + item.level * 15 + 'px'"
                :href="'#' + item.id"
              >
                {{ item.title }}
              </a>
            </div>
            <div class="no_data" v-else>无目录</div>
          </div>
        </div>
        <AsideList
          :list="categoryList"
          title="categoryName"
          cover="cover"
          count="blogCount"
      /></el-aside>
    </el-affix>
  </el-container>
  <!-- <div v-html="blogDetail.content"></div> -->
</template>

<style scoped lang="scss">
.main {
  background-color: #ffffff;
  padding: 10px 20px;
  max-width: 75%;
  .title {
    font-weight: 800;
    font-size: 28px;
  }
  .message {
    width: calc(100% - 40px);
    height: 30px;
    background-color: #f4f4f4;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    line-height: 30px;
    color: #999aaa;
    .blueText {
      color: #409eff;
    }
  }
  .message > span {
    margin-right: 30px;
  }
}
.aside {
  background-color: #ffffff;
  width: 100%;
  margin-left: 10px;
  padding: 10px;
  .catalog {
    margin-top: 10px;
    margin-bottom: 30px;
    .header {
      height: 20px;
      margin-bottom: 20px;
      .aside_title {
        font-weight: 800;
      }
    }
    .body {
      max-height: 218px;
      overflow: auto;
      .catalog_item {
        box-sizing: border-box;
        display: block;
        width: 100%;
        //   height: 26px;
        line-height: 26px;
        font-size: 14px;
        //   background-color: #e05050;
        cursor: pointer;
        color: rgb(56, 56, 56);
      }
      .catalog_item:hover {
        background-color: #e6f7ff;
        //   opacity: 0.6;
      }
      .no_data {
        text-align: center;
        color: #999aaa;
        font-size: 14px;
      }
    }
  }
}

.firsta {
  padding-top: 60px; /* 60px是导航栏高度 */
  margin-top: -60px;
  color: #409eff !important;
}
</style>
