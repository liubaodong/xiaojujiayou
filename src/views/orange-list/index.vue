<template>
  <div>
    <x-header class="title">
      <van-row type="flex" align="center" justify="center">
        <van-col
          span="1"
        />
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
                  <strong class="money">{{ item.vipPrice /100 }}</strong>
                  /升/{{ params.oilNum }}#</van-col>
                <van-col span="10" class="sub_tit">
                  距您 {{ (item.distance / 1000).toFixed(2) }}  km
                </van-col>
              </van-row>
              <van-row style="margin-top:6px">
                <van-tag class="tag">
                  <svg-icon icon-class="down" style="width:20px" />
                  <van-tag
                    plain
                    style="font-size:12px"
                    type="danger"
                  >已降{{ (item.cityPrice-item.vipPrice)/100 }}</van-tag>
                </van-tag>
              </van-row>
            </van-col>
          </van-row>

          <van-row type="flex" align="center">
            <van-col style="flex:1" class="text-ell">
              <svg-icon icon-class="position" />
              {{ item.storeAddress }}
            </van-col>
            <van-col span="5">
              <van-button round class="button" type="primary" size="small" @click="goLocation(item.jumpUrl)">
                <svg-icon icon-class="location" />
                导航
              </van-button>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "OrangeListIndex",
  components: {},
  props: {},
  data() {
    return {
      params: {
        page: 1,
        oilNum: 92
      },
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      location: "",

      value1: 0,
      value2: "92",
      option1: [
        { text: "距离最近", value: 0 }
      ],
      option2: [
        { text: "92号油", value: "92" },
        { text: "95号油", value: "95" },
        { text: "0号油", value: "0" },
        { text: "98号油", value: "98" }
      ]
    };
  },
  computed: {

  },
  watch: {},
  created() {},
  mounted() {
    console.log('params', this.$store.state.params.openid)
    this.getPositionParams();
  },
  methods: {
    // 导航
    goLocation(url){
      if(url){
        window.location.href = url
      }
    },
    onLoad() {
      setTimeout(() => {
        this.params.page++;
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        this.getlist();
        this.loading = false;

        this.finished = this.list.length % 10 !== 0 || !this.list.length
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
      this.list = []
      this.params.page = 1
      this.params.oilNum = e
      this.getlist()
    },

    // 获取地理位置参数
    getPositionParams() {
      const url = window.location.href.split("#")[0];
      this.$request({
        url: "/user/getWxConfigInfo",
        params: {
          url: url
        }
      }).then(({ object }) => {
        this.getLocation(object);
      });
    },
    // 详情跳转
    goDetail(url) {
      this.$router.push({ path: "/orange-list/detail" });
    },
    // 获取地理位置
    getLocation(object) {
      const _this = this;
      const wx = this.$wx;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: object.appId, // 必填，公众号的唯一标识
        timestamp: object.timestamp, // 必填，生成签名的时间戳
        nonceStr: object.nonceStr, // 必填，生成签名的随机串
        signature: object.signature, // 必填，签名
        jsApiList: ["checkJsApi", "openLocation", "getLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.checkJsApi({
        jsApiList: ["getLocation"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          if (res.checkResult.getLocation === false) {
            alert(
              "你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！"
            );
            return;
          }
        }
      });
      var latitude;
      var longitude;
      var speed;
      var accuracy;
      wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.getLocation({
          success: function(res) {
            latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            speed = res.speed; // 速度，以米/每秒计
            accuracy = res.accuracy; // 位置精度
            alert(latitude);
            alert(accuracy);
            _this.getlist({ lat: latitude, lng: longitude });
          },
          cancel: function(res) {
            alert("未能获取地理位置");
          }
        });
      });
      wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        alert("验证出错");
      });

      setTimeout(() => {
        this.getlist();
      }, 100);
    },
    // 获取数据列表
    getlist({ lat, lng }) {
      this.$request({
        url: `/store/storeList?lng=${lng}&lat=${lat}&orderBy=distance&openid=${this.$store.state.params.openid}&oilNum=${this.params.oilNum}&page=${this.params.page}`
      }).then((data) => {
        if(data.success === true){
          this.list.push(...data.object);
        }
      });
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
  border-radius: 4px;
  background: red;
  padding: 0;
}
</style>
