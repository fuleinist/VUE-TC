<template>
  <v-row>
    <v-col>
      <v-sheet height="400">
        <v-calendar
          color="primary"
          type="day"
          :start="getDate()"
          :first-interval="workday.day.start"
          :interval-count="workday.day.end - workday.day.start"
          :interval-style="intervalStyle"
        >
          <template v-slot:interval="{ hour }">
            <div
              style="height: inherit; width: inherit;"
              @click="openLogForm(hour)"
              @click.stop="dialog = true"
            ></div>
          </template>
        </v-calendar>
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
            <Form :inputs="inputs" :data="{ Start: hour, End: hour + 1 }" />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn color="green darken-1" text @click="dialog = false">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-nested-ternary */
import Form from '@/ui/Form/Form.ui'

const stylings = {
  default() {
    return undefined
  },
  workday(interval) {
    const inactive =
      interval.weekday === this.workday.week.weekend[0] ||
      interval.weekday === this.workday.week.weekend[1] ||
      interval.hour < this.workday.day.start ||
      interval.hour >= this.workday.day.end
    const startOfHour = interval.minute === 0
    const { dark } = this
    const mid = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

    return {
      // display: inactive ? 'none' : 'inherit',
      backgroundColor: inactive
        ? dark
          ? 'rgba(0,0,0,0.4)'
          : 'rgba(0,0,0,0.05)'
        : undefined,
      borderTop: startOfHour ? undefined : `1px dashed ${mid}`
    }
  },
  past(interval) {
    return {
      backgroundColor: interval.past
        ? this.dark
          ? 'rgba(0,0,0,0.4)'
          : 'rgba(0,0,0,0.05)'
        : undefined
    }
  }
}
export default {
  components: { Form },
  props: {
    inputs: Array,
    workday: {
      type: Object,
      default() {
        return {
          week: { start: 1, end: 5, weekend: [0, 6] },
          day: { start: 5, end: 19 }
        }
      }
    },
    styleInterval: String,
    getDate: Function
  },
  data() {
    return {
      hour: '',
      dialog: false
    }
  },
  computed: {
    intervalStyle() {
      return stylings[this.styleInterval].bind(this)
    }
  },
  methods: {
    openLogForm(hour) {
      console.log({ this: this, hour })
      // `event` is the native DOM event
      if (hour) {
        this.hour = hour
        this.dialog = true
      }
    },
    showIntervalLabel(interval) {
      return interval.minute === 0
    }
  }
}
</script>
