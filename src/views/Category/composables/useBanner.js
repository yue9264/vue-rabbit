//封装banner轮播图相关业务代码
import { ref, onMounted } from 'vue';
import { getBannerAPI  } from "@/apis/home";


export function useBanner () {
    const bannerList = ref([])
    const getBanner = async() => {
        const res = await getBannerAPI({
            distribution: '2'
        })
        console.log(res)
        bannerList.value = res.result
    }

    onMounted(() => getBanner())

    return {
        bannerList
    }
}