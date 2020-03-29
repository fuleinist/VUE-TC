<template>
  <div class="page-wrapper">
    <h1 class="jobs-page-title">Update Job</h1>
    <update-job v-if="networkOnLine"></update-job>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UpdateJob from '@/components/jobs/UpdateJob'

export default {
  components: { UpdateJob },
  computed: {
    ...mapState('app', ['networkOnLine'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.jobs-page-title {
  text-align: center;
  margin-bottom: 60px;
}
</style>
