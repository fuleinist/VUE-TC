<template>
  <div>
    <p v-if="logs === null" class="infos-label">Loading...</p>
    <p v-if="logs && !logs.length" class="infos-label">
      You don't have any log yet
    </p>
    <router-link class="add-btn" :to="{ name: 'logadd' }">
      {{ 'Create New Log' }}
    </router-link>
    <log-item
      v-for="(log, index) in logs"
      :key="log.id"
      class="log-row"
      :index="index"
      :is-log-deletion-pending="isLogDeletionPending(log.id)"
      :disable-actions="!networkOnLine"
      :data="log"
      @deleteProduct="deleteLog"
    ></log-item>
    <DayCalendar />
  </div>
</template>

<script>
import LogItem from '@/components/logs/LogItem'
import DayCalendar from '@/ui/Calendar/Calendar.ui'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { LogItem, DayCalendar },
  computed: {
    ...mapGetters('logs', ['isLogDeletionPending']),
    ...mapState('logs', ['logs']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: mapActions('logs', ['deleteLog'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.log-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}

.add-btn {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid;
  display: inline-block;
  border-radius: 3px;
  margin-left: 10px;
  color: $vue-color;
  border-color: $vue-color;
}
</style>
