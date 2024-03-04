import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    name: "首页",
    path: "/",
    component: () => import("../views/Framework.vue"),
    redirect: "/blog",
    children: [
      {
        name: "博客列表",
        path: "blog",
        component: () => import("../views/blog/BlogList.vue"),
      },
      {
        name: "专题列表",
        path: "special",
        component: () => import("../views/special/SpecialList.vue"),
      },
      {
        name: "博客详情",
        path: "blog/:id",
        component: () => import("../views/blog/BlogDetail.vue"),
      },
      {
        name: "分类专栏",
        path: "category",
        component: () => import("../views/category/CategoryList.vue"),
      },
      {
        name: "分类详情",
        path: "category/:id",
        component: () => import("../views/category/CategoryDetail.vue"),
      },
      {
        name: "专题详情",
        path: "special/:id",
        component: () => import("../views/special/SpecialDetail.vue"),
      },
      {
        name: "成员",
        path: "users",
        component: () => import("../views/users/Users.vue"),
      },
      {
        name: "留言板",
        path: "message",
        component: () => import("../views/message/Message.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
