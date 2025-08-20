import request from '@/utils/request'

/**
 * 获取默认配置
 * @returns {Promise}
 */
export function getDefaultCaicai() {
  return request({
    url: '/caicai',
    method: 'get'
  })
}

/**
 * 修改配置
 * @param {string} id - 配置ID
 * @param {Object} data - 配置数据
 * @returns {Promise}
 */
export function updateCaicai(id, data) {
  return request({
    url: `/caicai/${id}`,
    method: 'put',
    data
  })
}