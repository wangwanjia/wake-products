// 添加对应的接口
import request from '@/utils/request';

// 用户注册
export function registerUser(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  });
}

// 用户登录
export function loginUser(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}

// 管理员登录
export function loginAdmin(data) {
  return request({
    url: '/user/loginAdmin',
    method: 'post',
    data
  });
}

// 获取用户列表（带分页）
export function getUsers(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  });
}

// 获取单个用户信息
export function searchUserName(name) {
  return request({
    url: `/user/search`,
    method: 'get',
    params: {
      username: name
    }
  });
}

// 更新用户
export function updateUser(id, data) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data
  });
}

// 批量删除用户
export function batchDeleteUsers(userIds) {
  return request({
    url: '/user/batchDelete',
    method: 'delete',
    data: {
      userIds
    }
  });
}
