<template>
  <div class="w-full fade-in">
    <el-tabs type="border-card">
      <el-tab-pane :label="item.label" v-for="item in tabList">
        <div class="flex justify-between items-center">
          <div class="text-md md:text-lg">
            第 <span class="font-bold text-(--red)">076</span> 期
          </div>
          <button
            class="bg-(--green) text-white font-bold! text-sm! md:text-md! py-1! px-md!"
          >
            历史记录
          </button>
        </div>
        <!-- 开奖结果 -->
        <ul class="flex justify-around items-center py-3">
          <template v-for="(item, index) in 7">
            <li v-if="index < 6" class="w-center flex-col">
              <div
                class="code red-code center w-[38px] h-[38px] lg:w-[48px] lg:h-[48px] text-[16px] md:text-[20px] lg:text-[22px] md:text-[22px]/11 font-bold text-shadow-md shadow-xl/10"
              >
                33
              </div>
              <div class="sx-wx mt-1 text-sm md:text-lg">
                <span class="">马</span>
                <span class="text-black/30 mx-0.5">/</span>
                <span class="text-(--red)">水</span>
              </div>
            </li>

            <template v-else>
              <li class="center flex-col">
                <svg
                  t="1753105802498"
                  class="icon max-md:w-[18px] max-md:h-[18px]"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="14699"
                  width="32"
                  height="32"
                >
                  <path
                    d="M512.537805 4.093235C232.773837 4.093235 5.172019 231.685734 5.172019 511.439258c0 279.736115 227.601818 507.32759 507.365786 507.32759 279.76704 0 507.368858-227.591475 507.368858-507.32759C1019.90656 231.685734 792.303718 4.093235 512.537805 4.093235zM512.537805 966.843187c-251.129651 0-455.438029-204.298957-455.438029-455.404032 0-251.120333 204.307354-455.422464 455.438029-455.422464 251.130675 0 455.443149 204.299981 455.443149 455.422464C967.979827 762.543206 763.668378 966.843187 512.537805 966.843187zM490.074214 527.631974c-2.18071-14.180966-15.551795-23.882957-29.614694-21.702246l-50.692608 7.808819L409.766912 404.345118l51.927754 0c14.33303 0 25.964339-11.629875 25.964339-25.962291 0-14.33344-11.631411-25.962291-25.964339-25.962291l-51.927754 0 0-86.539982c0-14.334464-11.619123-25.962291-25.962291-25.962291-14.344294 0-25.964339 11.627827-25.964339 25.962291l0 86.539982-34.615774 0 0-51.924603c0-14.33344-11.621171-25.962291-25.964339-25.962291-14.342246 0-25.963315 11.628851-25.963315 25.962291l0 61.676711c0 19.808154-11.89335 31.961907-20.418867 31.961907-14.34327 0-25.964339 11.628851-25.964339 25.962291 0 14.332416 11.621171 25.962291 25.964339 25.962291 26.58048 0 49.602662-16.885555 62.177587-41.715098l44.784784 0 0 117.371174-107.156787 16.496742c-14.174413 2.18071-23.894118 15.431475-21.712384 29.612442 1.968947 12.829184 13.031322 22.00617 25.624678 22.00617 1.310925 0 2.646426-0.101274 3.982848-0.303923l99.263795-15.280026 0 176.258353c0 14.335488 11.620147 25.961267 25.964339 25.961267 14.34327 0 25.962291-11.625779 25.962291-25.961267L409.769138 566.270021l58.605056-9.025536C482.536243 555.063808 492.255027 541.812019 490.074214 527.631974zM755.944141 404.345139 652.091754 404.345139l0-51.924603 86.543528 0c14.334054 0 25.963315-11.629875 25.963315-25.962291 0-14.33344-11.629363-25.962291-25.963315-25.962291l-86.543528 0 0-69.231781c0-14.334464-11.629363-25.962291-25.962291-25.962291-14.335078 0-25.963315 11.626803-25.963315 25.962291l0 69.231781-69.235641 0c-14.335078 0-25.963315 11.628851-25.963315 25.962291 0 14.332416 11.628339 25.962291 25.963315 25.962291l69.235641 0 0 51.924603-86.545574 0c-14.332006 0-25.96137 11.628851-25.96137 25.961267 0 14.33344 11.629363 25.963315 25.96137 25.963315l242.32372 0c14.335078 0 25.963315-11.629875 25.963315-25.963315C781.907558 415.97399 770.278195 404.345139 755.944141 404.345139zM755.944141 525.501542l-51.924684 0 0-34.616402c0-14.33344-11.629363-25.962291-25.964339-25.962291-14.33303 0-25.962291 11.628851-25.962291 25.962291l0 34.616402L513.619448 525.501542c-14.332006 0-25.96137 11.628851-25.96137 25.963315 0 14.332416 11.629363 25.961267 25.96137 25.961267l138.471282 0 0 123.607202c0 23.343616 0 33.01079-48.006246 33.01079-14.33303 0-25.960346 11.630899-25.960346 25.962291 0 14.334464 11.627315 25.963315 25.960346 25.963315 29.903258 0 99.932979 0 99.932979-84.936499L704.017463 577.427128l51.924684 0c14.335078 0 25.963315-11.628851 25.963315-25.961267C781.907558 537.131418 770.278195 525.501542 755.944141 525.501542zM539.583795 603.38944c-14.33303 0-25.964339 11.628851-25.964339 25.961267l0 51.924603c0 14.334464 11.631411 25.963315 25.964339 25.963315 14.335078 0 25.963315-11.628851 25.963315-25.963315l0-51.924603C565.547213 615.018291 553.918874 603.38944 539.583795 603.38944z"
                    p-id="14700"
                    fill="#039e6d"
                  ></path>
                </svg>
              </li>
              <li class="center flex-col">
                <div
                  class="code red-code center w-[38px] h-[38px] lg:w-[48px] lg:h-[48px] text-[16px] md:text-[20px] lg:text-[22px] md:text-[22px]/11 font-bold text-shadow-md shadow-xl/10"
                >
                  33
                </div>
                <div class="sx-wx mt-1 text-sm md:text-lg">
                  <span class="">马</span>
                  <span class="text-black/30 mx-0.5">/</span>
                  <span class="text-(--red)">水</span>
                </div>
              </li>
            </template>
          </template>
        </ul>
        <!-- 下一期开奖时间 -->
        <div class="flex justify-start items-center">
          <div class="text-sm md:text-lg">
            第
            <span class="font-bold text-(--red)">077</span>
            期开奖时间：07月06号21:35 星期日
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 开奖期数 历史记录 内嵌 -->
    <!-- <iframe src="https://4548754.top/bbs/49am/" frameborder="0" class="w-full"></iframe> -->

    <!-- 开奖期数 历史记录  -->
  </div>
</template>

<script setup>
import { ref } from "vue";

let tabCurrent = ref('User')
const tabClick = (val) => {
  tabCurrent.value = val
}
let tabList = ref([
  {
    label: '新澳门',
    id: 'macao_new'
  },
  {
    label: '澳门',
    id: 'macao'
  },
  {
    label: '香港',
    id: 'hongkong'
  },
])

</script>

<style scoped>

 :deep(.el-tabs__nav){
    width: 100%;
    background-color: var(--primary);
    color: white;
    padding: 0 8px;
 }

 :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item){
    flex-grow: 1;
    color: white;
    font-size: 22px;
    font-weight: bold;
    border-radius: 12px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top:5px solid var(--primary);
    border-bottom:0px;
 }

 @media screen and (max-width: 768px) {
    :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item){
        font-size: 18px;
    }
 }

 :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active){
    color: var(--red);
 }
 :deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover){
    color: var(--red);
 }


:deep(.el-tabs--border-card>.el-tabs__content){
    padding: 8px;
}

:deep(.el-tabs--border-card){
    --el-border-color:var(--primary);
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
}
:deep(.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active){
    border-left-color: var(--primary);
    border-right-color: var(--primary);
}

</style>
