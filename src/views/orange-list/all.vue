<template>
  <div class="all">
    <div v-for="(item,i) in list" :key="i" class="box">
      <van-row class="first">
        <van-col span="4" class="left">
          <svg-icon icon-class="add-oil" />
        </van-col>
        <van-col span="16">
          <title1>{{ item.storeName }}</title1>
        </van-col>
        <van-col span="4">
          <span>
            待付款
          </span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="16" offset="4">
          <van-row>
            <sub-title> 92#|2020-5.12 18:18:00</sub-title>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="foot">
        <van-col span="16" offset="4">
          <title1> ￥{{ item.vipPrice }}</title1>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { list } from '../../utils/data'

export default {
  name: "All",
  components: {},
  props: {},
  data() {
    return {
      list
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log('list', list)
  },
  mounted() {},
  methods: {
    // 付款
    pay() {
      this.$dialog.alert({
        title: "订单操作", // 加上标题
        showCancelButton: true, // 展示取水按钮
        cancelButtonText: '取消订单',
        confirmButtonText: '去支付'
      })
        .then(() => { // 点击确认按钮后的调用
          console.log("点击了确认按钮噢")
        })
        .catch(() => { // 点击取消按钮后的调用
          console.log("点击了取消按钮噢")
        })
    }
  }
};
</script>
<style lang="scss" scoped>
.all{

   .box{
    margin-top: 12px;
    padding: 12px ;
    background: white;
    .first{
      line-height: 28px;
    }
    .foot{
      line-height: 28px;
    }
    .left{
      text-align: center;
    }
  }
}

</style>
