<template>
  <div>
    <x-header class="title">
      <van-row type="flex" align="center" justify="center">
        <van-col span="1" />
        <van-col span="23">全国加油优惠</van-col>
      </van-row>
    </x-header>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="changeSelect1"
      />
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        @change="changeSelect2"
      />
    </van-dropdown-menu>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :offset="100"
        :immediate-check="false"
        class="list"
        :finished="finished"
        finished-text="没有更多了~"
        error-text="请求失败"
        @load="onLoad"
      >
        <van-cell v-for="(item, i) in list" :key="i">
          <!--  @click.native="goLocation(item.jumpUrl)" -->
          <van-row
            type="felx"
            align="center"
          >
            <van-col span="6" style="padding:6px">
              <img style="width:100%" :src="item.storeLogo">
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
                  <strong class="money">{{ item.vipPrice / 100 }}</strong>
                  /升/{{ params.oilNum }}#</van-col>
                <van-col span="10" class="sub_tit">
                  距您 {{ (item.distance / 1000).toFixed(2) }} km
                </van-col>
              </van-row>
              <van-row style="margin-top:6px">
                <van-tag class="tag">
                  <svg-icon icon-class="down" style="width:20px" />
                  <van-tag
                    plain
                    style="font-size:12px"
                    type="danger"
                  >已降{{ (item.cityPrice - item.vipPrice) / 100 }}</van-tag>
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
              <van-button
                round
                class="button"
                type="primary"
                size="small"
                @click.native="goLocation(item)"
              >
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
import { mapGetters } from "vuex";
export default {
  name: "OrangeListIndex",
  components: {},
  props: {},
  data() {
    return {
      params: {
        page: 1,
        oilNum: 92,
        pageSize: 10,
        orderBy: 'distance'
      },
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      location: "",

      value1: 'distance',
      value2: 92,
      option1: [{ text: "距离最近", value: 'distance' }],
      option2: [
        { text: "92号油", value: 92 },
        { text: "95号油", value: 95 },
        { text: "0号油", value: 0 },
        { text: "98号油", value: 98 }
      ],
      lat: "",
      lng: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loading = true
    this.getPositionParams();
  },
  mounted() {
  },
  methods: {
    // 导航
    goLocation(item) {
      const wx = this.$wx
      console.log('item', item)
      wx.openLocation({
        latitude: item.storeLat, // 纬度，浮点数，范围为90 ~ -90
        longitude: item.storeLon, // 经度，浮点数，范围为180 ~ -180。
        name: item.storeName, // 位置名
        address: item.storeAddress, // 地址详情说明
        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: item.jumpUrl // 在查看位置界面底部显示的超链接,可点击跳转
      });
    //  window.location.href = item.jumpUrl;
    },
    onLoad() {
      if(this.finished) return
      this.loading = true

      this.getlist()
      console.log('params', this.params.page)
    },
    onRefresh() {
      this.params.page = 1
      this.refreshing = true
      this.loading = true
      this.list = []
      this.getlist()
      console.log('params++', this.params.page)
    },

    // 下拉选择距离
    changeSelect1(e) {
      this.params.orderBy = e
      this.params.page = 1
      this.refreshing = true
      this.loading = true
      this.list = []
      this.getlist()
    },

    // 下拉选择油
    changeSelect2(e) {
      this.params.oilNum = e
      this.params.page = 1
      this.refreshing = true
      this.loading = true
      this.list = []
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
          type: "gcj02",
          success: function(res) {
            latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            speed = res.speed; // 速度，以米/每秒计
            accuracy = res.accuracy; // 位置精度
            // alert(latitude);
            // alert(accuracy);
            _this.lat = latitude;
            _this.lng = longitude;
            // _this.getlist();
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
    getlist() {
      const lng = "120.457587";
      const lat = "36.119269";
      const openid = "oLk8JwGvmfGi0dnO-K9ra6nJPHJk";
      this.$request({
        url: `/store/storeList?lng=${this.lng || lng}&lat=${this.lat || lat}&orderBy=distance&openid=${
          this.$store.state.params.openid || openid}&oilNum=${this.params.oilNum}&page=${this.params.page}`
      })
        .then((data) => {
          if(data.status === 'success'){
            this.finished = data.object.length < this.params.pageSize
            this.loading = false
            this.refreshing = false
            this.list.push(...data.object)
            this.params.page++
          } else {
            this.finished = true
            this.list = []
            this.$toast(`${data.object}`); // 弹出
          }
        })
        .catch(err => {
          this.$toast(`${err.object}`); // 弹出
        })
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
