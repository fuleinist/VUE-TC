<template>
  <div class="job-detail">
    <div v-for="jobvar in job" :key="jobvar.id">
      <b>{{ jobvar.label }}:</b> {{ jobvar.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    job: Array
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
