import { defineStore } from "pinia";
import { ref } from "vue";

export const useOpenCodeStore = defineStore("openCode", () => {
  const isRefresh = ref({
    macao: false,
    newMacao: false,
    hongKong: false,
  }); //是否需要刷新数据
  // 当天操作结果类型
  const activeNameType = ref("新澳门");
  // 操作结果类型列表
  const nameTypeList = ref(["新澳门", "澳门", "香港"]);

  return {
    isRefresh,
    activeNameType,
    nameTypeList,
  };
});
