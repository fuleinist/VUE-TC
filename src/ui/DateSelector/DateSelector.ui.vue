<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    min-width="290px"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        class="mt-3"
        label="Selected Date"
        prepend-icon="event"
        dense
        readonly
        outlined
        hide-details
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="dateSelected">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: { getdate: Function, setdate: Function },
  data() {
    return {
      date: new Date(this.getdate()).toISOString().substr(0, 7),
      menu: false,
      modal: false
    }
  },
  methods: {
    dateSelected() {
      // $refs.menu.save(this.date)
      // this.$router.push({ params: { date: this.date } })
      this.setdate(this.date)
    }
  }
}
</script>
