<template>
  <div class="x-header">
    <slot>
      <slot name="back"></slot>
      <slot name="title"></slot>
      <slot name="next"></slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: "x-header",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
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
