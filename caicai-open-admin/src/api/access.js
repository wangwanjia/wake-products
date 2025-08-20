import request from "@/utils/request";

// 添加网站访问记录
export function createWebAccess(data) {
  return request({
    url: '/access',
    method: 'post',
    data
  })
}

// 获取网站访问记录
export function getWebAccessList(data) {
  return request({
    url: '/access',
    method: 'get',
    params: data
  })
}

// 删除网站访问记录 清空
export function deleteWebAccess() {
  return request({
    url: '/access',
    method: 'delete',
  })
}

