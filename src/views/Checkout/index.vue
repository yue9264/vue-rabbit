<script setup>
import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout';
import {useRouter} from 'vue-router';
import { onMounted, ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore()
const router = useRouter()
const curAddress = ref({})
const checkInfo = ref({})  
const getCheckInfo = async() => {
    const res = await getCheckInfoAPI()
    checkInfo.value = res.result
    //适配默认地址
    //从地址列表中筛选出来 isDefault === 0 那一项
    const item = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
    curAddress.value = item
}
onMounted(() => getCheckInfo())

const showDialog = ref (false)

//切换地址
const activeAddress = ref({})
const switchAddress = (item) => {
    activeAddress.value = item
}

const confirm = () => {
    curAddress.value = activeAddress.value
    showDialog.value =false
    activeAddress.value = {}
}

//创建订单
const createOrder = async() => {
    const res = await createOrderAPI({
        deliveryTimeType: 1,
        payType: 1,
        payChannel: 1,
        buyerMessage: '',
        goods:checkInfo.value.goods.map(item => {
            return {
                skuId: item.skuId,
                count: item.count
            }
        }),
        addressId: curAddress.value.id

    })
    const orderId =res.result.id
    router.push({
        path: '/pay',
        query: {
            id: orderId
        }
    })
    //更新购物车
    cartStore.updateNewList()
}

</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">Shipping Address</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!curAddress">You need to add a shipping address before submitting the order.</div>
              <ul v-else>
                <li><span>recipient<i /><i />：</span>{{ curAddress.receiver }}</li>
                <li><span>Contact：</span>{{ curAddress.contact }}</li>
                <li><span>shipping address：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">Change Address</el-button>
              <el-button size="large" @click="addFlag = true">Add Address</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">Item information</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">Item information</th>
                <th width="170">price</th>
                <th width="170">quantity</th>
                <th width="170">subtotal</th>
                <th width="170">total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>${{ i.price }}</td>
                <td>{{ i.price }}</td>
                <td>${{ i.totalPrice }}</td>
                <td>${{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">Delivery time</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">Delivery available any time: Monday to Sunday</a>
          <a class="my-btn" href="javascript:;">Delivery on weekdays: Monday to Friday</a>
          <a class="my-btn" href="javascript:;">Weekend and Holiday Delivery: Saturday to Sunday</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">Payment Method</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">checkout online</a>
          <a class="my-btn" href="javascript:;">pay on delivery</a>
          <span style="color:#999">There is a $5 handling charge for cash on delivery</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">Details of Amount</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>Number of Items：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}items</dd>
            </dl>
            <dl>
              <dt>Total Price of Items：</dt>
              <dd>¥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>Delivery<i></i>fee：</dt>
              <dd>¥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>Total Amount Due：</dt>
              <dd class="price">{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" @click="createOrder" size="large" >Submit order</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="change shipping address" width="30%" center>
    <div class="addressWrapper">
        <div class="text item" :class="{active: activeAddress.id === item.id}" @click="switchAddress(item)"
         v-for="item in checkInfo.userAddresses"  :key="item.id">
        <ul>
        <li><span>Recipient<i /><i />：</span>{{ item.receiver }} </li>
        <li><span>Contact Information：</span>{{ item.contact }}</li>
        <li><span>Shipping Address：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
        </div>
    </div>
    <template #footer>
        <span class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
        </span>
    </template>
    </el-dialog>
  <!-- 添加地址 -->
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>