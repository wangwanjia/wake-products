// 封装axios请求工具
const axios = require('axios');
const logger = require('../middlewares/logger');

// 导出基准地址
export const baseURL = process.env.API_BASE_URL || 'http://localhost:4000';

// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 10000, // 超时时间设置为10秒
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求前可以添加认证信息
    // 例如: config.headers.Authorization = `Bearer ${token}`;

    // 记录请求日志
    logger.info(`[请求] ${config.method.toUpperCase()} ${config.url}`);
    if (config.data) {
      logger.debug(`[请求数据] ${JSON.stringify(config.data)}`);
    }

    return config;
  },
  (error) => {
    logger.error(`[请求错误] ${error.message}`);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 记录响应日志
    logger.info(`[响应] ${response.status} ${response.config.url}`);
    logger.debug(`[响应数据] ${JSON.stringify(response.data)}`);

    // 统一处理响应数据
    return response.data;
  },
  (error) => {
    // 处理响应错误
    let errorMessage = '请求失败';
    if (error.response) {
      // 服务器返回了错误状态码
      logger.error(`[响应错误] ${error.response.status} ${error.response.config.url}`);
      logger.error(`[错误信息] ${JSON.stringify(error.response.data)}`);

      switch (error.response.status) {
        case 400:
          errorMessage = '请求参数错误';
          break;
        case 401:
          errorMessage = '未授权，请登录';
          break;
        case 403:
          errorMessage = '权限不足';
          break;
        case 404:
          errorMessage = '请求资源不存在';
          break;
        case 500:
          errorMessage = '服务器内部错误';
          break;
        default:
          errorMessage = `请求失败: ${error.response.status}`;
      }
    } else if (error.request) {
      // 请求已发送但未收到响应
      logger.error(`[响应错误] 未收到响应: ${error.message}`);
      errorMessage = '网络连接超时';
    } else {
      // 设置请求时发生错误
      logger.error(`[请求错误] ${error.message}`);
      errorMessage = `请求错误: ${error.message}`;
    }

    return Promise.reject({
      code: error.response?.status || -1,
      message: errorMessage,
      data: error.response?.data || null
    });
  }
);

export default service;

