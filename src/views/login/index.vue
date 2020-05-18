<template>
  <div class="login">
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="phone"
        type="tel"
        label="手机号"
        name="phone"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '手机号必填' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号不正确' },
        ]"
      />
      <div style="margin: 16px;">
        <van-button class="btn" round block type="primary" native-type="submit">
          确定
        </van-button>
      </div>
    </van-form>
    <span class="detail " @click="goList">
      我的订单
    </span>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      phone: "",
      openId: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.phone = this.$route.query.phone !== 'null' ? this.$route.query.phone : ''
    this.openid = this.$route.query.openid ? this.$route.query.openid : 'oLk8JwGvmfGi0dnO-K9ra6nJPHJk';
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      this.phone = values.phone;
      const openid = "oLk8JwGvmfGi0dnO-K9ra6nJPHJk";
      this.$store.commit("getParams", {
        openid: this.openid,
        phone: this.phone
      });
      this.$request({
        url: `/user/bindPhone`,
        params: {
          openid: this.openid,
          phone: this.phone
        }
      }).then((data) => {
        if(data.status !== 'success'){
          this.$toast(`${data.object}`); // 弹出
        } else {
          this.$router.replace({ path: "/orange-list" });
        }
      });
    },
    // 我的订单
    goList() {
      this.$router.push({
        path: "/orange-list/detail",
        query: {
          openid: this.openid,
          page: 1
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  .form {
    margin-top: 200px;
  }
  .btn {
    margin-top: 24px;
  }
  .detail {
    display: inline-block;
    height: 60px;
    width: 60px;
    border-radius: 100%;
    line-height: 60px;
    text-align: center;
    color: white;
    background: #d6c386;
    position: absolute;
    bottom: -270px;
    right: 16px;
    animation-name: mychange; /*动画的名字*/
    animation-duration: 500ms; /*定义动画完成一个周期所需要的时间，以秒或毫秒计*/
    animation-iteration-count: infinite; /*定义动画的播放次数，这里是无限播放*/
    animation-direction: alternate; /*定义是否应该轮流反向播放动画，这里是动画轮流播放*/
  }
  @keyframes mychange {
    0% {
      transform: translateY(10px);
    }
    100% {
    transform: translateY(-10px);
    }
  }
}
</style>
