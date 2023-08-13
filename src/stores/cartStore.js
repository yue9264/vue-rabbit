//封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    //1.定义state- cartList
    const cartList = ref([])
    //2.定义action - addCart
    const addCart = (goods) => {
        //添加购物车操作
        //已添加过 - count +1
        //没有添加过 - 直接push
        //思路：通过匹配传递过来的商品对象中的skuId能不能再cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            //找到了
            item.count++
        } else {
            //没找到
            cartList.value.push(goods)
        }
        
    }

    const delCart = (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId ===item.skuId)
        cartList.value.splice(idx,1)
    }

    //计算属性
    //1.总的数量 所有项的count之和
    const allCount = computed(()=> cartList.value.reduce((a,c) => a + c.count, 0))
    const allPrice = computed(()=> cartList.value.reduce((a,c) => a + c.count*c.price, 0))
    //2.总价 所有项的count*price之和


    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }

}, {
    persist: true,
})