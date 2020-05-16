<template>
  <div class="box">
    <x-header class="title">
      <van-row type="flex" align="center" justify="center">
        <van-col
          span="1"
        >
          <van-icon
            name="arrow-left"
            @click="goBack"
          />
        </van-col>
        <van-col span="23">订单详情</van-col>
      </van-row>
    </x-header>
    <!-- 详情 -->
    <div class="content">
      <title1 class="title2">
        <svg-icon icon-class="success" />
        支付成功
      </title1>

      <sub-title class="sub-tit">{{ detail.orderGunNo }}号枪 | {{ detail.orderPayTime }}</sub-title>
      <div class="midle-tit">{{ detail.orderStoreName }}</div>
      <div class="midle-tit sub_tit">{{ detail.orderPayTime }}</div>
    </div>
    <div>
      <van-row class="midle-tit com" type="flex" justify="space-between" align="center">
        <van-col>订单总额</van-col>
        <van-col style="font-size: 16px">￥{{ (detail.orderTotalMoney / 100).toFixed(2) }}</van-col>
      </van-row>
      <van-row class="midle-tit com" type="flex" justify="space-between" align="center">
        <van-col>付款金额</van-col>
        <van-col style="font-size: 16px">￥{{ (detail.orderRealMoney / 100).toFixed(2) }}</van-col>
      </van-row>
      <van-row class="midle-tit com" type="flex" justify="space-between" align="center">
        <van-col>订单编号</van-col>
        <van-col class="sub_tit">{{ detail.orderSn }}</van-col>
      </van-row>
      <van-row class="midle-tit com" type="flex" justify="space-between" align="center">
        <van-col>下单时间</van-col>
        <van-col class="sub_tit">{{ detail.orderPayTime }}</van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  components: {

  },
  props: {

  },
  data(){
    return {
      detail: {}
    }
  },
  computed: {

  },
  watch: {

  },
  created(){
    this.detail = this.$route.query
    console.log('item', this.$route.query)
  },
  mounted(){

  },
  methods: {
    // 返回
    goBack() {
      history.back();
    }
  }
}
</script>
<style lang='scss' scoped>
.box{
  // background: #F7F5F8;
  height: 100%;
}

  .content{
    padding: 24px 0;
    text-align: center;
  }
  .title2{
      font-weight: normal;
      color: #7ACF67;
      font-size: 24px;
      line-height: 40px;
    }
    .sub-tit{
      font-size: 14px;
      line-height: 30px;
    }
    .midle-tit{
      font-size: 14px;
      line-height: 30px;
    }
    .com{
      padding: 0 12px;
    }
</style>
