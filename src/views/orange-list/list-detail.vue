<template>
  <div>
    <x-header class="title">
      <van-row type="flex" align="center" justify="center">
        <van-col
          span="1"
        >
          <van-icon
            name="arrow-left"
            @click="goBack"
          /></van-col>
        <van-col span="23">订单列表</van-col>
      </van-row>
    </x-header>
    <van-tabs v-model="active">
      <van-tab title="全部" class="all">
        <all />
      </van-tab>
      <van-tab title="" disabled>内容 2</van-tab>
      <van-tab title="" disabled>内容 3</van-tab>
      <van-tab title="" disabled>内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import all from './all'
export default {
  name: 'ListDetail',
  components: {
    all
  },
  props: {

  },
  data(){
    return {
      active: 0

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
    // 返回
    goBack() {
      history.back();
    }

  }
}
</script>
<style lang="scss" scoped>
.all {
  background: #eee;
}
</style>
