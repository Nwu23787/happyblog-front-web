import httpRequest from "@/utils/request.js";

/**
 * 获取博客列表
 * @param {Number} pageNo 请求的页码
 * @param {Number} paegSize 分页大小
 * @param {String} categoryId 分类ID
 * @returns array
 */
export const getBlogListAPI = (params) => {
  return httpRequest({
    url: "/view/loadBlogList",
    method: "GET",
    params,
  });
};

/**
 * 获取系统设置
 * @returns object
 */
export const getSysInfoAPI = () => {
  return httpRequest({
    url: "/view/getSysInfo",
  });
};

/**
 * 获取分类列表
 * @returns Array
 */
export const loadCategoryAPI = () => {
  return httpRequest({
    url: "/view/loadCategory",
  });
};

/**
 * 获取用户列表
 * @returns Array
 */
export const loadTeamUserAPI = () => {
  return httpRequest({
    url: "/view/loadTeamUser",
  });
};

/**
 * 获取专题列表
 * @returns Array
 */
export const loadSpecialAPI = () => {
  return httpRequest({
    url: "/view/loadSpecial",
  });
};

/**
 * 根据ID获取博客详情
 * @param {String} blogId 博客id
 * @returns Object
 */
export const getBlogDetailAPI = (blogId) => {
  return httpRequest({
    url: "/view/getBlogDetail",
    params: {
      blogId,
    },
  });
};

/**
 * 获取分类详情
 * @param {String} categoryId 分类id
 * @returns
 */
export const getCategoryAPI = (categoryId) => {
  return httpRequest({
    url: "/view/getCategory",
    params: {
      categoryId,
    },
  });
};

/**
 * 获取分类详情
 * @param {Number} categoryId 分类id
 * @returns
 */
export const getSpecialDetailAPI = (categoryId) => {
  return httpRequest({
    url: "/view/getSpecialDetail",
    params: {
      categoryId,
    },
  });
};
