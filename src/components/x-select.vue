<template>
  <div>
    <slot>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </slot>
  </div>
</template>

<script>
export default {
  name: "x-select",
  components: {},
  props: {},
  data() {
    return {
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
  methods: {},
};
</script>
<style lang="scss" scoped></style>
