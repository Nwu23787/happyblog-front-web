<script setup>
import { onMounted, reactive, ref, nextTick } from "vue";
import { getSpecialDetailAPI, getBlogDetailAPI } from "@/api/index.js";
import { useRoute, useRouter } from "vue-router";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import { ArrowDown, ArrowRight } from "@element-plus/icons-vue";

// 专题详情
const specialDetail = ref({});
// 专题博客树形列表
const treeList = ref([]);
// 博客详情
const blogDetail = ref({});
// 目录列表
const catalogList = ref([]);
// 是否展示目录
const showCatalog = ref(true);

// 树形控件列表
const treeRef = ref();

const currentNodeKey = ref("");

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
      // 加入目录数组
      catalogList.value.push({
        id: "anchor_" + index,
        title: node.innerText,
        level: node.nodeName.slice(1),
      });
      index++;
    }
  });
  console.log("catalog", catalogList);
};

const handleNodeClick = async (data) => {
  const res = await getBlogDetailAPI(data.blogId);
  blogDetail.value = res;
  nextTick(() => {
    let blocks = document.querySelectorAll("pre code");
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
    // 清空目录数组
    catalogList.value = [];
    createCatalogList();
  });
};

const defaultProps = {
  children: "children",
  label: "title",
};

const route = useRoute();
const router = useRouter();

const getSpecialDetail = async () => {
  const res = await getSpecialDetailAPI(route.params.id);
  specialDetail.value = res.blogCategory;
  treeList.value = res.blogList;
  nextTick(() => {
    if (treeList.value.length) {
      // 选中第一个节点
      currentNodeKey.value = treeList.value[0].blogId;
      treeRef.value.setCurrentKey(currentNodeKey.value);
      // 加载博客详情
      handleNodeClick({ blogId: currentNodeKey.value });
    }
  });
  console.log(treeList.value);
};

onMounted(() => {
  getSpecialDetail();
});

// 展开关闭目录
const changeShowCatalog = () => {
  showCatalog.value = !showCatalog.value;
};
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="left">
        <div class="detail">
          <el-image
            class="special_cover"
            :src="'/api/file/getImage/' + specialDetail.cover"
            fit="fill"
          >
            <template #error>
              <div class="image-slot">无封面</div>
            </template>
          </el-image>
          <div class="detail_right">
            <div class="title">
              {{ specialDetail.categoryName }}
            </div>
            <div class="count">文章数：{{ specialDetail.blogCount }}</div>
          </div>
        </div>
        <div class="intro">
          <span>简介：{{ specialDetail.categoryDesc }}</span>
        </div>
        <div class="tree">
          <el-tree
            :data="treeList"
            ref="treeRef"
            :props="defaultProps"
            :default-expand-all="true"
            :expand-on-click-node="false"
            node-key="blogId"
            @node-click="handleNodeClick"
            :highlight-current="true"
          />
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="right">
        <el-main class="main">
          <h1 class="title">{{ blogDetail.title }}</h1>
          <div class="message">
            <span class="time">{{ blogDetail.createTime }}</span>
            <span
              >作者：<a class="blueText" @click="router.push('/users')">{{
                blogDetail.nickName
              }}</a></span
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
      </div>
      <!-- 目录 -->
      <div class="catalog">
        <div class="header" @click="changeShowCatalog">
          <span class="aside_title">目录</span>
          <el-icon class="arrow" v-if="showCatalog"><ArrowDown /></el-icon>
          <el-icon class="arrow" v-else><ArrowRight /></el-icon>
        </div>
        <div class="body" v-if="showCatalog">
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
          <div class="no_data" v-else>暂无目录</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.left {
  background-color: #fff;
  min-height: 600px;
  height: 100%;

  .detail {
    box-sizing: border-box;
    height: 80px;
    padding: 10px;
    .special_cover {
      height: 60px;
      width: 60px;
      vertical-align: top;
      margin-right: 10px;
    }
    .detail_right {
      display: inline-block;
      width: calc(100% - 80px);
      .title {
        margin-top: 5px;
        font-size: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .count {
        margin-top: 10px;
        font-size: 13px;
        color: #919da9;
      }
    }
  }
  .intro {
    height: 20px;
    padding-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13px;
  }
}

.right {
  .main {
    background-color: #ffffff;
    padding: 10px 20px;
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
}

.catalog {
  width: 250px;
  background-color: #ffffff;
  position: fixed;
  top: 70px;
  right: 5%;
  border: 1px solid #d7d7d7;
  box-shadow: -2px 4px 7px #b5b4b4;
  .header {
    position: relative;
    box-sizing: border-box;
    padding-left: 10px;
    height: 40px;
    cursor: pointer;
    .arrow {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(-50%, -50%);
    }
    .aside_title {
      line-height: 40px;
    }
  }
  .body {
    border-top: 1px solid #aba7a7;
    max-height: 400px;
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
      line-height: 30px;
      height: 30px;
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
