<script setup>
import { onMounted, ref } from "vue";
import { loadSpecialAPI } from "@/api/index.js";
import { useRouter } from "vue-router";

// 分类列表
const categoryList = ref([]);

// 获取专题分类
const getCategoryList = async () => {
  const res = await loadSpecialAPI();
  categoryList.value = res.list;
  console.log(res);
};

const router = useRouter();
// 详情页
const toDetail = (id) => {
  router.push("/special/" + id);
};

onMounted(() => {
  getCategoryList();
});
</script>

<template>
  <div class="category_main">
    <div
      class="category_item"
      v-for="item in categoryList"
      :key="item.categoryId"
    >
      <el-image
        class="category_cover"
        :src="'/api/file/getImage/' + item.cover"
        fit="fill"
      >
        <template #error>
          <div class="image-slot">无封面</div>
        </template>
      </el-image>
      <div class="category_Text">
        <div class="title" @click="toDetail(item.categoryId)">
          {{ item.categoryName }}
        </div>

        <div class="intro">{{ item.categoryDesc }}</div>
        <div class="count">文章数：{{ item.blogCount }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category_main {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  gap: 33px;
  box-sizing: border-box;
  width: 100%;
  //   height: 200px;
  background-color: #ffffff;
  padding: 20px;
  .category_item {
    box-sizing: border-box;
    width: 300px;
    height: 120px;
    border: 1px solid rgb(213, 213, 213);
    border-radius: 5px;
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
        color: #409eff;
        font-size: 18px;
        margin-top: 10px;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .intro {
        max-width: 100%;
        margin-top: 10px;
        font-size: 14px;
        color: rgba(30, 30, 30, 0.916);
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
