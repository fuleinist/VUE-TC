<template>
  <v-row>
    <v-col>
      <v-sheet height="400">
        <v-calendar
          color="primary"
          type="day"
          :start="getdate()"
          :first-interval="4"
          :interval-count="16"
          :interval-style="intervalStyle"
          :show-interval-label="showIntervalLabel"
        >
          <template v-slot:interval="{ hour }">
            <div
              style="height: inherit; width: inherit;"
              @click="openLogForm"
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
            <v-card-text>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </v-card-text>
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
const stylings = {
  default() {
    return undefined
  },
  workday(interval) {
    const inactive =
      interval.weekday === 0 ||
      interval.weekday === 6 ||
      interval.hour < 5 ||
      interval.hour >= 19
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
    styleinterval: String,
    showintervallabel: String,
    getdate: Function
  },
  data() {
    return {
      hour: '',
      dialog: false
    }
  },
  computed: {
    intervalStyle() {
      return stylings[this.styleinterval].bind(this)
    }
  },
  methods: {
    openLogForm(event) {
      // `event` is the native DOM event
      if (event) {
        console.log(event.target.innerHTML)
        this.hour = event.target.innerHTML
        this.dialog = true
      }
    },
    showIntervalLabel(interval) {
      return interval.minute === 0
    }
  }
}
</script>
