<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        type="number"
        name="phone"
        :rules="[{ required: true, message: '手机号必填' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          确定
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {

  },
  props: {

  },
  data(){
    return {
      phone: 13888888888
    }
  },
  computed: {

  },
  watch: {

  },
  created(){

  },
  mounted(){

  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
      this.$router.replace({ path: '/orange-list' })
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
