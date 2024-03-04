<script setup>
import { useRoute, useRouter } from "vue-router";
import {
  getCategoryAPI,
  getBlogListAPI,
  loadCategoryAPI,
} from "@/api/index.js";
import { onMounted, ref, nextTick, reactive } from "vue";
import AsideList from "@/components/AsideList.vue";

const route = useRoute();
const router = useRouter();

// 分类列表
const categoryList = ref([]);
// 博客列表
const blogList = ref([]);
// 分类详情对象
const categoryDetailObj = reactive({
  categoryId: null,
  cover: null,
  categoryName: "",
  categoryDesc: "",
  categoryType: 1,
  userId: null,
  nickName: "",
  blogCount: 0,
});

// 分页信息
const page = ref({
  pageNo: 1,
  pageSize: 10,
});

//总条数
const totalBlogCount = ref(0);

// 获取分类
const getCategoryList = async () => {
  const res = await loadCategoryAPI();
  // 只展示前五篇
  categoryList.value = res.slice(0, 6);
};

// 获取分类详情
const getCategory = async () => {
  const res = await getCategoryAPI(route.params.id);
  Object.assign(categoryDetailObj, res);
};

// 获取分类博客列表
const getBlogList = async () => {
  const res = await getBlogListAPI({
    ...page.value,
    categoryId: route.params.id,
  });
  blogList.value = res.list;
  totalBlogCount.value = res.totalCount;
};

onMounted(() => {
  getCategoryList();
  getBlogList();
  getCategory();
});

// 跳转博客详情页
const toBlogDetail = (id) => {
  router.push({ name: "博客详情", params: { id } });
};
</script>

<template>
  <el-container class="body">
    <el-main class="main">
      <div class="header">
        <el-image
          class="category_cover"
          :src="'/api/file/getImage/' + categoryDetailObj.cover"
          fit="fill"
        >
          <template #error>
            <div class="image-slot">无封面</div>
          </template>
        </el-image>
        <div class="category_Text">
          <div class="title">{{ categoryDetailObj.categoryName }}</div>
          <div class="intro">{{ categoryDetailObj.categoryDesc }}</div>
          <div class="count">文章数：{{ categoryDetailObj.blogCount }}</div>
        </div>
      </div>
      <div class="list">
        <div v-if="blogList.length">
          <div v-for="item in blogList" :key="item.blogId">
            <div class="blog_item">
              <el-image
                class="blog_cover"
                :src="'/api/file/getImage/' + item.cover"
                fit="fill"
                v-if="item.cover"
              />
              <div
                class="text"
                :style="{ width: item.cover ? 'calc(100% - 110px)' : '100%' }"
              >
                <a class="title" @click="toBlogDetail(item.blogId)">{{
                  item.title
                }}</a>
                <br />
                <el-text line-clamp="2" style="margin-top: 5px">
                  {{ item.summary }}
                </el-text>
                <div class="footer">
                  <span>{{ item.createTime }}&nbsp;&nbsp;</span>
                  <span>
                    作者：<a class="big_text" @click="router.push('/users')"
                      >{{ item.nickName }}&nbsp;&nbsp;</a
                    ></span
                  >
                  <span>
                    分类专栏：<a
                      class="big_text"
                      @click="router.push('/category/' + item.categoryId)"
                      >{{ item.categoryName }}</a
                    ></span
                  >
                </div>
              </div>
            </div>
            <hr class="hr" />
          </div>
        </div>
        <div class="empty" v-else><span>空空如也</span></div>
        <el-pagination
          v-model:current-page="page.pageNo"
          v-model:page-size="page.pageSize"
          background
          layout="sizes,prev, pager, next"
          :page-sizes="[5, 10, 15, 20]"
          :total="totalBlogCount"
          class="mt-4 pagination"
          @size-change="getBlogList"
          @current-change="getBlogList"
          :pager-count="6"
        />
      </div>
    </el-main>
    <div style="width: 25%">
      <el-aside class="aside">
        <AsideList
          :list="categoryList"
          title="categoryName"
          cover="cover"
          count="blogCount"
        />
      </el-aside>
    </div>
  </el-container>
</template>

<style scoped lang="scss">
.main {
  padding: 0;
  width: 75%;
  .list {
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;

    .empty {
      height: 30px;
      text-align: center;
      span {
        line-height: 30px;
        color: #919da9;
      }
    }
    .blog_item {
      width: 100%;
      height: 100px;
      position: relative;

      .title {
        font-weight: normal;
        font-size: 18px;
        color: #409eff;
        height: 100px;
      }

      .blog_cover {
        width: 100px;
        height: 100px;
        // top: 50%;
        // transform: translate(0, -50%);
        vertical-align: top;
      }

      .text {
        position: relative;
        display: inline-block;
        height: 100%;

        margin-left: 10px;
        // box-sizing: border-box;
        // padding: 0px;

        .footer {
          font-size: 12px;
          position: absolute;
          bottom: 5px;
          .big_text {
            font-size: 14px;
            color: #2690faeb;
          }
        }
      }
    }
    .blog_item:hover {
      background-color: #f9f9f9;
      opacity: 0.7;
    }
  }

  .header {
    width: calc(100% - 20px);
    height: 100px;
    background-color: #fff;
    padding: 10px;
    .category_cover {
      height: 100px;
      width: 100px;
      vertical-align: top;
    }
    .category_Text {
      display: inline-block;
      margin-left: 10px;
      width: calc(100% - 120px);
      .title {
        color: #202020;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .intro {
        max-width: 100%;
        margin-top: 10px;
        font-size: 16px;
        color: rgba(10, 10, 10, 0.916);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .count {
        margin-top: 10px;
        font-size: 16px;
        color: #919da9;
      }
    }
  }

  .hr {
    background-color: #f3f3f3;
    height: 2px;
    border: none;
  }
}
.aside {
  background-color: #fff;
  width: 100%;
  margin-left: 10px;
  padding: 10px;
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
