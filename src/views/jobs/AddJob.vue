<template>
  <div class="page-wrapper">
    <h1 class="jobs-page-title">Add Job</h1>
    <add-job v-if="networkOnLine"></add-job>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddJob from '@/components/jobs/AddJob'

export default {
  components: { AddJob },
  computed: mapState('app', ['networkOnLine'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.jobs-page-title {
  text-align: center;
  margin-bottom: 60px;
}
</style>
