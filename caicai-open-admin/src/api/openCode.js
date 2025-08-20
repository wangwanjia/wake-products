import request from "@/utils/request";

/**
 * 查询所有数据
 * @param {page:number,pageSize:number} params 
 * @returns 
 */
export const getOpenCodeList = (params) => {
  return request({
    url: "/openCode/getAll",
    method: "get",
    params,
  });
};

/**
 * 日期查询
 * @param {startDate: date, endDate: date} params 
 * 格式 yyyy-MM-dd HH:mm:ss
 * @returns 
 */
export const getOpenCodeByDate = (params) => {
  return request({
    url: `/openCode/getByDate`,
    method: "get",
    params
  });
};

// 新增结果
export const addOpenCode = (data) => {
  return request({
    url: "/openCode/create",
    method: "post",
    data,
  });
};

// 编辑结果
export const editOpenCode = (id, data) => {
  return request({
    url: `/openCode/update/${id}`,
    method: "put",
    data,
  });
};


// 批量删除结果
export const batchDeleteOpenCode = (openType, ids) => {
  return request({
    url: `/openCode/del`,
    method: "delete",
    data: {
      openType,
      ids
    }
  });
};

// 清空数据
export const clearAllOpenCodes = (openType) => {
  return request({
    url: `/openCode/clearAll`,
    method: "delete",
    data: {
      openType
    }
  });
};

// 获取年份开奖数据
export const getOpenDataYear = (openType, year) => {
  return request({
    url: `/openCode/getOpenDataYear`,
    method: "get",
    params: {
      openType,
      year
    }
  });
};

// 获取最新一期数据
export const getOpenDataNew = (openType) => {
  return request({
    url: `/openCode/getOpenDataNew`,
    method: "get",
    params: {
      openType
    }
  });
};


