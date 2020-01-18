<template>
  <div>
    <h2>{{ date() }}</h2>
    <p v-if="logs === null" class="infos-label">Loading...</p>
    <p v-if="logs && !logs.length" class="infos-label">
      You don't have any log yet
    </p>
    <DayCalendar />
  </div>
</template>

<script>
import DayCalendar from '@/ui/Calendar/Calendar.ui'
import { mapState, mapGetters } from 'vuex'

import store from '@/store'

export default {
  components: { DayCalendar },
  computed: {
    ...mapGetters('logs', ['isLogDeletionPending']),
    ...mapState('logs', ['logs', 'logCreationPending']),
    ...mapState('app', ['networkOnLine'])
  },
  mounted() {
    store.dispatch(`logs/getLogsByDateNUser`, this.$route.params.date)
  },
  methods: {
    date() {
      return this.$route.params.date
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
