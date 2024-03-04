<script setup>
import {
  getBlogListAPI,
  loadCategoryAPI,
  loadTeamUserAPI,
  loadSpecialAPI,
} from "@/api/index.js";
import { onMounted, ref } from "vue";
import AsideList from "@/components/AsideList.vue";
import { useRouter } from "vue-router";

// 博客列表
const blogList = ref([]);
// 分类列表
const categoryList = ref([]);
// 用户列表
const userList = ref([]);
// 专题列表
const specialList = ref([]);

// 分页信息
const page = ref({
  pageNo: 1,
  pageSize: 10,
});

//总条数
const totalBlogCount = ref(0);

const router = useRouter();

// 获取博客列表
const getBlogList = async () => {
  const res = await getBlogListAPI(page.value);
  blogList.value = res.list;
  totalBlogCount.value = res.totalCount;
  console.log(res);
};

// 获取专题分类
const getCategoryList = async () => {
  const res = await loadCategoryAPI();
  // 只展示前五篇
  categoryList.value = res.slice(0, 5);
};

// 获取用户列表
const getUserList = async () => {
  const res = await loadTeamUserAPI();
  // 最多展示三个用户
  userList.value = res.slice(0, 3);
};

// 获取专题列表
const getSpecialList = async () => {
  const res = await loadSpecialAPI();
  specialList.value = res.list.slice(0, 5);
};

onMounted(() => {
  getBlogList();
  getCategoryList();
  getUserList();
  getSpecialList();
});

// 跳转详情页
const toBlogDetail = (id) => {
  router.push("blog/" + id);
};
</script>

<template>
  <el-row>
    <el-col :span="18" class="mainList">
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
    </el-col>
    <el-col :span="6" class="right">
      <div class="interval"></div>
      <div class="content">
        <!-- 分类侧边栏 -->
        <AsideList
          :list="categoryList"
          title="categoryName"
          cover="cover"
          count="blogCount"
        />
        <!-- 用户列表侧边栏 -->
        <div class="user">
          <div class="header">
            <span class="aside_title">博客成员</span>
            <a class="more" @click="router.push('/users')">更多>></a>
          </div>
          <hr />
          <div class="body">
            <div
              v-for="item in userList"
              :key="item.userId"
              style="margin-bottom: 10px"
            >
              <el-image
                class="round_cover"
                :src="'/api/file/getImage/' + item.avatar"
                fit="fill"
              >
                <template #error>
                  <div class="image-slot">无头像</div>
                </template>
              </el-image>
              <div class="leftText">
                <div class="middleDiv">
                  <a class="nickName" @click="router.push('/users')">{{
                    item.nickName
                  }}</a>
                  <div class="job">{{ item.profession }}</div>
                </div>
              </div>
              <div class="number">{{ item.blogCount }}篇</div>
            </div>
          </div>
        </div>
        <!-- 专题侧边栏列表 -->
        <AsideList
          :list="specialList"
          title="categoryName"
          cover="cover"
          count="blogCount"
          headerText="专题"
          url="/special"
        />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.mainList {
  padding: 10px;
  width: 100%;
  background-color: #ffffff;
  position: relative;
  padding-bottom: 42px;
  .hr {
    background-color: #f3f3f3;
    height: 2px;
    border: none;
  }
  .pagination {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
}

.aside_title {
  font-weight: 800;
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
  background-color: #fcfcfc;
  opacity: 0.9;
}

.right {
  .interval {
    float: left;
    height: 100%;
    width: 10px;
    background-color: #f1f1f1;
  }
  .content {
    float: left;
    box-sizing: border-box;
    width: calc(100% - 10px);
    height: 100%;
    padding: 20px;
    .header {
      height: 20px;
      .title {
        float: left;
      }
      .more {
        float: right;
        color: #409eff;
        font-size: 14px;
      }
    }
    .body {
      width: 100%;
      .aside_item {
        width: 100%;
        height: 50px;
        padding-bottom: 10px;
        .cover {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          vertical-align: middle;
          border-radius: 3px;
        }

        .title {
          font-size: 14px;
          color: #409eff;
        }
        .number {
          float: right;
          color: #8b8b8b;
          line-height: 50px;
        }
      }
      // 圆形图片
      .round_cover {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        vertical-align: top;
        margin-right: 10px;
      }
    }
    .leftText {
      display: inline-block;
      height: 60%;
    }
    .nickName {
      font-size: 14px;
      font-weight: 800;
      line-height: 36px;
    }
    .job {
      font-size: 12px;
      color: #8b8b8b;
    }
    .number {
      float: right;
      color: #8b8b8b;
      line-height: 60px;
    }
  }
  background-color: #fff;
  .user {
    margin: 20px 0;
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
