<template>
  <div>
    <x-header class="title">
      <van-row type="flex" align="center" justify="center">
        <van-col
          span="1"
        ><van-icon
          name="arrow-left"
          @click="goBack"
        /></van-col>
        <van-col span="23">全国加油优惠</van-col>
      </van-row>
    </x-header>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="changeSelect"
      />
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        @change="changeSelect"
      />
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" />
    </van-dropdown-menu>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        class="list"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="(item, i) in list" :key="i">
          <van-row type="felx" align="center">
            <van-col span="6" style="padding:6px">
              <img
                style="width:100%"
                :src="item.storeLogo"
                @click="goDetail(item.jumpUrl)"
              >
            </van-col>
            <van-col span="18">
              <van-row>
                <strong>{{ item.storeName }}</strong>
              </van-row>
              <van-row>
                <van-col
                  class="tit"
                  span="14"
                >￥
                  <strong class="money">{{ item.vipPrice }}</strong>
                  /升/92#</van-col>
                <van-col span="10" class="sub_tit">距您 2.7km</van-col>
              </van-row>
              <van-row>
                <span class="tag">
                  <svg-icon icon-class="down" />
                  <van-tag
                    plain
                    style="font-size:12px"
                    type="danger"
                  >已将0.49</van-tag>
                </span>
              </van-row>
            </van-col>
          </van-row>
          <van-row type="flex" align="center" justify="space-between">
            <van-col>
              <van-row type="flex" align="center">
                <svg-icon icon-class="position" />
                <!-- <van-icon class="icon" name="location-o" /> -->
                <van-col>
                  {{ item.storeCityName }}
                </van-col>
              </van-row>
            </van-col>
            <van-col><van-button round class="button" type="primary" size="small">
              <svg-icon icon-class="location" />
              导航</van-button></van-col>
          </van-row>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { list } from '../../utils/data'
const wx = require('weixin-js-sdk');
export default {
  name: "OrangeListIndex",
  components: {},
  props: {},
  data() {
    return {
      params: {},
      loading: false,
      finished: false,
      refreshing: false,
      list,
      location: '',

      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],
      option2: [
        { text: "92号油", value: "a" },
        { text: "95号油", value: "b" },
        { text: "0号油", value: "c" },
        { text: "98号油", value: "d" }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.getPositionParams();
    console.log('list', this.list)
  },
  mounted() {},
  methods: {
    // 返回
    goBack() {
      history.back();
    },
    onLoad() {
      console.log('到底')
    },
    onRefresh() {
    },
    // 下拉选择
    changeSelect(e) {
      console.log("e", e);
    },

    // 获取地理位置参数
    getPositionParams() {
      this.$request({ url: "/user/getWxConfigInfo" }).then(({ object }) => {

      });
    },
    // 详情跳转
    goDetail(url) {
      this.$router.push({ path: "/orange-list/detail" });
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
}
.list {
  background-color: #f7f7f7;
}
.button {
  background: #d6c386 !important;
}
.tit {
  color: red;
}
.icon {
  color: #d6c386 !important;
}
.sub_tit {
  color: #c1c1c1;
}
.money {
  font-size: 20px;
}
.tag {
  background: red;
  padding: 1px;
  display: inline-block;
}
</style>
