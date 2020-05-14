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
        :rules="[{ required: true, message: '手机号必填' }]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="primary"
          size="small"
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
    if (this.$router.query && this.$router.query.openid) {
      this.openId = this.$router.query.openid;
      this.$store.commit(this.openId);
    }
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      this.$router.replace({ path: "/orange-list" });
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
}
</style>
