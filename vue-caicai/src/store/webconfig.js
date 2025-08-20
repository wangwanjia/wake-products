
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultCaicai } from '@/api/caicai'


export const useWebConfigStore = defineStore('webconfig',()=> {

    const webConfig = ref({
        name: '',
        logo: '',
        watermarkImage: '',
        bgImage: '',
        bannerImage: '',
        headerCode: '',
        footerCode: '',
        postHeaderCode: '',
        postFooterCode: '',
    })
    async function getWebConfigInfo() {

        const res = await getDefaultCaicai()
        if (res.success == true) {
            webConfig.value = res.data
        }
    }
  return {
    webConfig,
    getWebConfigInfo
  }
})
