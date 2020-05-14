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
          { pattern: /^1[3456789]\d{9}$/,message: '手机号不正确' },
        ]"
      />
      <div style="margin: 16px;">
        <van-button
          class="btn"
          round
          block
          type="primary"
          native-type="submit"
        >
          确定
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      phone: '',
      openId: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.query && this.$route.query.openid) {
      this.openId = this.$route.query.openid;
      console.log('openid', this.openId)
    }
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.$store.commit('getParams', { openid: this.$route.query.openid || 'oLk8JwGvmfGi0dnO-K9ra6nJPHJk', phone: values.phone });
      this.$request({ url: `/user/bindPhone`, params: {
        openid: this.$route.query.openid || 'oLk8JwGvmfGi0dnO-K9ra6nJPHJk',
        phone: values.phone
      }})
        .then(data => {
          this.$router.replace({ path: "/orange-list" });
        })
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
  .btn{
    margin-top: 24px;
  }
}
</style>
