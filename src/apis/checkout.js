import request from '@/utils/http'

//获取详情的接口
export const getCheckInfoAPI = () => {
    return request ({
        url: '/member/order/pre'
    })
}