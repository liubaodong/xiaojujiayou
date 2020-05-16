<template>
  <div class="all">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败"
        @load="onLoad"
      >
        <van-cell v-for="(item, i) in orderList" :key="i" @click.native="goDetail(item)">
          <van-row class="first">
            <van-col span="4" class="left">
              <img
                class="img"
                src="https://view.didistatic.com/static/dcms/2r6k9w50wd8_156x156.jpeg"
                alt=""
              >
              <!-- <svg-icon icon-class="add-oil" /> -->
            </van-col>
            <van-col span="16">
              <title1>{{ item.orderStoreName }}</title1>
            </van-col>
            <van-col span="4">
              <span>
                {{ ["未付款", "已付款"][item.orderPayStatus] }}
              </span>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="16" offset="4">
              <van-row>
                <sub-title>{{ item.orderItemName }} | {{ item.orderPayTime }}</sub-title>
              </van-row>
            </van-col>
          </van-row>
          <van-row class="foot">
            <van-col span="16" offset="4">
              <title1 style="margin-top:6px">
                ￥{{ (item.orderTotalMoney / 100).toFixed(2) }}</title1>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { list } from "../../utils/data";

export default {
  name: "All",
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      params: {
        openid: "",
        page: 1,
        pageSize: 10
      },
      orderList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loading = true
    const query = this.$route.query;
    this.params.openid = query.openid;
    this.params.page = query.page || 1;
    this.getList();
  },
  mounted() {},
  methods: {
    // 获取订单列表
    getList() {
      this.$request({ url: "order/orderList", params: { ...this.params }})
        .then((data) => {
          this.loading = false
          this.refreshing = false
          this.params.page++
          this.finished = data.object.records < this.params.pageSize
          this.orderList.push(...data.object.records)
          console.log("data--", this.orderList);
        })
        .catch(() => {
          this.$toast("网络开小差了, 请重试~"); // 弹出
        });
    },
    onRefresh() {
      this.refreshing = true;
      this.loading = true;
      this.params.page = 1;
      this.orderList = []
      this.getList()
    },
    onLoad() {
      if(this.finished) return
      this.loading = true;
      this.getList()
    },
    // 查看详情
    goDetail(item){
      this.$router.push({
        path: '/orange-list/order-detail',
        query: { ...item }
      })
      console.log('item', item)
    }
  }
};
</script>
<style lang="scss" scoped>
.all {
  .box {
    margin-top: 12px;
    padding: 12px;
    background: white;
    .first {
      line-height: 28px;
      position: relative;
    }
    .foot {
      line-height: 28px;
    }
    .left {
      text-align: center;
    }
  }
  .img {
    width: 40px;
    position: absolute;
    top:4px
  }
}
</style>
