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

// 删除结果
export const deleteOpenCode = (id) => {
  return request({
    url: `/openCode/del/${id}`,
    method: "delete",
  });
};

// 批量删除结果
export const batchDeleteOpenCode = (ids) => {
  return request({
    url: `/openCode/del`,
    method: "delete",
    data: {
      ids
    }
  });
};



