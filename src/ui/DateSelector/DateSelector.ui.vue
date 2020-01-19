<template>
  <v-menu
    ref="startMenu"
    v-model="startMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="start"
    transition="scale-transition"
    min-width="290px"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="start"
        class="mt-3"
        label="Start Date"
        prepend-icon="event"
        dense
        readonly
        outlined
        hide-details
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="start" no-title scrollable />
  </v-menu>
</template>

<script>
export default {
  data: () => ({})
}
</script>
