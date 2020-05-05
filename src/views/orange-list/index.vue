<template>
  <div>
    <x-header class="title">
      <van-row type="flex" align="center" justify="center">
        <van-col span="1"
          ><van-icon name="arrow-left" @click="goBack"
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
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      </van-pull-refresh>
    </van-dropdown-menu>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item">
          <van-row type="felx" align="center">
            <van-col span="6">
              <img
                style="width:100%"
                src="https://img.yzcdn.cn/vant/ipad.jpeg"
                alt="加载失败"
              />
            </van-col>
            <van-col span="18">
              <van-row>title</van-row>
              <van-row>conetne</van-row>
              <van-row>foot</van-row>
            </van-col>
          </van-row>
          <van-row type="flex" align="center" justify="space-between">
            <van-col>left</van-col>
            <van-col
              ><van-button round type="primary" icon="location-o" size="mini"
                >导航</van-button
              ></van-col
            >
          </van-row>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "orange-list-index",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "92号油", value: "a" },
        { text: "95号油", value: "b" },
        { text: "0号油", value: "c" },
        { text: "98号油", value: "d" },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 返回
    goBack() {
      history.back();
    },
     onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    // 下拉选择
    changeSelect(e) {
      console.log("e", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
}
.list {
  background-color: #f7f7f7;
}
</style>
