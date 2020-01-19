<template>
  <v-row>
    <v-col>
      <v-sheet height="400">
        <v-calendar color="primary" type="day" :start="getdate()">
          <template v-slot:day-header="present">
            <template v-if="present" class="text-center">
              {{ getdate ? getdate() : `Today` }}
            </template>
          </template>

          <template v-slot:interval="{ hour }">
            <div class="text-center">{{ hour }} o'clock</div>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: { getdate: Function },
  data: () => ({})
}
</script>
