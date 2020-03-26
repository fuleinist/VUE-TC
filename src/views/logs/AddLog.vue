<template>
  <div class="page-wrapper">
    <h1 class="logs-page-title">Add Logs</h1>
    <add-logs v-if="networkOnLine"></add-logs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddLogs from '@/components/logs/AddLogs'

export default {
  components: { AddLogs },
  computed: mapState('app', ['networkOnLine'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.logs-page-title {
  text-align: center;
  margin-bottom: 60px;
}
</style>
