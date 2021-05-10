<template>
  <div>
    <p>二级部门---{{ tier2 }}</p>
    <p>三级部门---{{ tier3 }}</p>
  </div>
</template>

<script>
export default {
  name: "budget",
  data() {
    return {
      tier2: this.$route.params.tier2,
      tier3: this.$route.params.tier3,
    };
  },
};
</script>

<style scoped>
</style>