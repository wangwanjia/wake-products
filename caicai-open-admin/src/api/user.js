import request from "@/utils/request";

// 用户注册
export const registerUser = (data) => {
  return request({ url: "/user/register", method: "post", data });
};

// 用户登录
export const loginUser = (data) => {
  return request({ url: "/user/login", method: "post", data });
};

// 管理员登录
export const loginAdmin = (data) => {
  return request({ url: "/user/loginAdmin", method: "post", data });
};


// 获取用户列表
export const getUsers = (params) => {
  return request({ url: "/user", method: "get", params });
};


// 获取单个用户信息
export const getUserById = (id) => {
  return request({ url: `/user/detail/${id}`, method: "get" });
};

// 更新用户
export const updateUser = (id, data) => {
  return request({ url: `/user/update/${id}`, method: "put", data });
};

// 批量删除用户
export const batchDeleteUsers = (data) => {
  return request({ url: "/user/batchDelete", method: "delete", data });
};

// 根据用户名搜索用户
export const searchUserByUsername = (params) => {
  return request({ url: "/user", method: "get", params });
};

// 初始化用户服务
export const initUserService = () => {
  return request({ url: "/user/init", method: "post" });
};
