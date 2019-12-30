<template>
  <div class="job-detail">
    <h1>{{ job.name }}</h1>
    <h2>Category: {{ job.category }}</h2>
    <h2>Total: {{ job.count }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    job: Object
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.job-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
