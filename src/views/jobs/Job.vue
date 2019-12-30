<template>
  <div class="page-wrapper">
    <job-detail v-if="currentJob" :job="currentJob"></job-detail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JobDetail from '@/components/jobs/JobDetail'

export default {
  components: { JobDetail },
  props: {
    id: String,
    name: String,
    category: String
  },
  computed: {
    ...mapGetters('jobs', ['getJobById']),
    currentJob() {
      return this.getJobById(this.id)
    }
  }
}
</script>
