<template>
  <div>
    <p>{{ date }}</p>
    <p>{{ currentLogs }}</p>
    <p v-if="logs === null" class="infos-label">Loading...</p>
    <p v-if="logs && !logs.length" class="infos-label">
      You don't have any log yet
    </p>
    <DayCalendar />
  </div>
</template>

<script>
import DayCalendar from '@/ui/Calendar/Calendar.ui'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { DayCalendar },
  computed: {
    ...mapGetters('logs', ['isLogDeletionPending']),
    ...mapState('logs', ['logs', 'logCreationPending']),
    ...mapState('app', ['networkOnLine']),
    date() {
      return this.$route.params.date
    }
  },
  methods: {
    ...mapActions('logs', ['deleteLog']),
    currentLogs() {
      console.log(this)
      return this.getLogsByDate(this.date)
    }
  }
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
