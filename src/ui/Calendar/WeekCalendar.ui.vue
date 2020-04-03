<template>
  <v-row>
    <v-col>
      <v-sheet height="400">
        <v-calendar
          color="primary"
          type="week"
          :start="getDate()"
          :first-interval="workday.day.start"
          :interval-count="workday.day.end - workday.day.start"
          :interval-style="intervalStyle"
        >
          <template v-slot:interval="{ hour }">
            <div
              style="height: inherit; width: inherit;"
              @click.stop="slotClick(hour)"
            ></div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-nested-ternary */
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
    getDate: Function,
    slotClick: Function
  },
  computed: {
    intervalStyle() {
      return stylings[this.styleInterval].bind(this)
    }
  },
  methods: {
    showIntervalLabel(interval) {
      return interval.minute === 0
    }
  }
}
</script>
