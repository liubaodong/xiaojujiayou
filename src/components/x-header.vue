<template>
  <div class="x-header">
    <slot>
      <slot name="back" />
      <slot name="title" />
      <slot name="next" />
    </slot>
  </div>
</template>

<script>
export default {
  name: "XHeader",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.x-header {
   padding: 12px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #eee;
}
</style>
