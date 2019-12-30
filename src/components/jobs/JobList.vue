<template>
  <div>
    <p v-if="jobs === null" class="infos-label">Loading...</p>
    <p v-if="jobs && !jobs.length" class="infos-label">
      You don't have any job yet
    </p>
    <job-item
      v-for="(job, index) in jobs"
      :key="job.id"
      class="job-row"
      :index="index"
      :is-job-deletion-pending="isJobDeletionPending(job.id)"
      :disable-actions="!networkOnLine"
      :data="job"
      @deleteProduct="deleteJob"
    ></job-item>
  </div>
</template>

<script>
import JobItem from '@/components/jobs/JobItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { JobItem },
  computed: {
    ...mapGetters('jobs', ['isJobDeletionPending']),
    ...mapState('jobs', ['jobs']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: mapActions('jobs', ['deleteJob'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.job-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
