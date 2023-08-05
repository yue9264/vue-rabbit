import httpInstance from "@/utils/http";

//获取banner

export function getBannerAPI (params = {}) {
    const { distribution ='1'} = params
    return httpInstance({
        url: '/home/banner',
        params: {
            distribution
        }
    })
}

export const findNewAPI = () => {
    return httpInstance({
        url:'/home/new'
    })
}

export const getHotAPI = () => {
    return httpInstance({
        url: '/home/hot'
    })
        
}

export const getGoodsAPI = () =>{
    return httpInstance({
        url: 'home/goods'
    })
}
