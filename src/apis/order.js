import request from '@/utils/http'

export const getUserOrderAPI = (params) => {
    return request({
        url: '/member/order',
        method: 'GET',
        params
    })
}