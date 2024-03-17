<script setup>
import { getOrderAPI } from '@/apis/pay';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const orderInfo = ref({})
const route =useRoute()
const getOrderInfo = async() => {
    const res = await getOrderAPI(route.query.orderId)
    orderInfo.value = res.result
}
onMounted(() => getOrderInfo())
</script>


<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 支付结果 -->
      <div class="pay-result">
        <!-- 路由参数获取到的是字符串而不是布尔值 -->
        <span class="iconfont icon-queren2 green" v-if="$route.query.payResult === 'true'"></span>
        <span class="iconfont icon-shanchu red" v-else></span>
        <p class="tit">Pay{{ $route.query.payResult === 'true' ? 'Success' : 'Failure' }}</p>
        <p class="tip">We will deliver the goods as soon as possible </p>
        <p>Payment Method：<span>Alipay</span></p>
        <p>Order total：<span>${{ orderInfo.payMoney?.toFixed(2) }}</span></p>
        <div class="btn">
          <el-button type="primary" style="margin-right:20px">View order</el-button>
          <el-button>Go to homepage</el-button>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          Tips: Fresh rabbit will not ask you to click any URL link for refund operation on the grounds of abnormal order and system upgrade, protect assets and operate with caution
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  >.iconfont {
    font-size: 100px;
  }

  .green {
    color: #1dc779;
  }

  .red {
    color: $priceColor;
  }

  .tit {
    font-size: 24px;
  }

  .tip {
    color: #999;
  }

  p {
    line-height: 40px;
    font-size: 16px;
  }

  .btn {
    margin-top: 50px;
  }

  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>