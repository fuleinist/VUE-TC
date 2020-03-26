<template>
  <div class="page-wrapper">
    <h1 class="jobs-page-title">Jobs page</h1>
    <job-list class="job-list"></job-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JobList from '@/components/jobs/JobList'

export default {
  components: { JobList },
  computed: mapState('app', ['networkOnLine'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.jobs-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.job-list {
  margin: 20px 0;
}
</style>
