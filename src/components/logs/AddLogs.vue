<template>
  <div>
    <p v-if="logs === null" class="infos-label">Loading...</p>
    <p v-if="logs && !logs.length" class="infos-label">
      You don't have any log yet
    </p>
    <p><DateSelector :getdate="getdate" :setdate="setdate" /></p>
    <DayCalendar
      :inputs="inputs"
      :get-date="getdate"
      :slot-click="slotclick"
      :style-interval="'workday'"
    />
    <v-dialog
      ref="dialog"
      v-model="dialog"
      :return-value.sync="hour"
      width="290px"
    >
      <v-card>
        <v-card-title class="headline">Create Log</v-card-title>
        <!-- <v-card-text> start: {{ hour }} </v-card-text>
            <v-card-text> end: {{ hour + 1 }} </v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <Form
            :inputs="inputs"
            :data="{ Start: hour, End: hour + 1 }"
            :item="logToCreate"
            :update="update"
            :pending="logCreationPending"
            :submit="submit"
            :cancel="cancel"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Form from '@/ui/Form/Form.ui'
import DayCalendar from '@/ui/Calendar/Calendar.ui'
import DateSelector from '@/ui/DateSelector/DateSelector.ui'
import { mapState, mapMutations, mapActions } from 'vuex'

import store from '@/store'

export default {
  components: { DayCalendar, DateSelector, Form },
  data() {
    return {
      inputs: [
        { name: 'Job', autocomplete: this.jobs, style: { flex: '1 100%' } },
        { name: 'Start' },
        { name: 'End' },
        { name: 'Note', style: { flex: '1 100%', height: '50px' } }
      ],
      dialog: false,
      hour: ''
    }
  },
  computed: {
    ...mapState('jobs', ['jobs']),
    ...mapState('logs', ['logs', 'logToCreate', 'logCreationPending']),
    ...mapMutations('logs', ['setLogToCreate']),
    ...mapActions('logs', ['triggerAddLogAction']),
    ...mapState('app', ['networkOnLine'])
  },
  mounted() {
    store.dispatch(`logs/getLogsByDateNUser`, this.$route.params.date)
  },
  methods: {
    getdate() {
      return this.$route.params.date
    },
    setdate(date) {
      this.$router.push({ name: 'logsadd', params: { date } })
    },
    slotclick(hour) {
      // `event` is the native DOM event
      if (hour) {
        this.hour = hour
        this.dialog = true
      }
      console.log({ this: this, dialog: this.dialog })
    },
    submit() {
      this.triggerAddLogAction()
    },
    update(data) {
      this.triggerAddLogAction(data)
    },
    cancel() {
      this.dialog = false
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
