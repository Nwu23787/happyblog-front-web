<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  headerText: {
    type: String,
    default: "分类专栏",
  },
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: "cover",
  },
  count: {
    type: String,
    default: "cover",
  },
  url: {
    type: String,
    default: "/category",
  },
});

const toMore = () => {
  router.push(props.url);
};
</script>

<template>
  <div class="category">
    <div class="header">
      <span class="aside_title">{{ props.headerText }}</span>
      <a class="more" @click="toMore">更多>></a>
    </div>
    <hr />
    <div class="body">
      <div class="aside_item" v-for="item in props.list" :key="item.categoryId">
        <el-image
          class="cover"
          :src="'/api/file/getImage/' + item[props.cover]"
          fit="fill"
        >
          <template #error>
            <div class="image-slot">无封面</div>
          </template>
        </el-image>
        <a
          class="title"
          @click="router.push(props.url + '/' + item.categoryId)"
          >{{ item[props.title] }}</a
        >
        <span class="number">{{ item[props.count] }}篇</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

.aside_title {
  font-weight: 800;
}
</style>
