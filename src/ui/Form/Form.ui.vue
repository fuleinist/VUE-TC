<template>
  <div class="action-bar">
    <input
      v-for="(input, index) in inputs"
      :key="index"
      :placeholder="input.name"
      class="input"
      :name="input.name"
      type="text"
      :value="item[input.name] || data ? data[input.name] : null"
      :style="createStyle(input.style)"
      @input="
        update({
          label: $event.target.name,
          value: $event.target.value
        })
      "
    />
    <div class="buttons">
      <br />
      <v-btn
        color="green"
        outlined
        :class="{ disabled: pending }"
        class="create-btn"
        @click="submit(item)"
      >
        Add Item
      </v-btn>
      <v-btn
        color="green"
        outlined
        :class="{ disabled: pending }"
        class="create-btn"
        @click="cancel(item)"
      >
        Cancel
      </v-btn>
    </div>
  </div>
</template>

<script>
/**
 * Form UI Element
 */
export default {
  props: {
    // takes inputs as an array
    inputs: {
      type: Array,
      default() {
        return [
          { name: 'Name', style: { flex: '1 100%' } },
          { name: 'Nodes', style: { flex: '1 100%', height: '50px' } }
        ]
      }
    },
    data: Object,
    item: Object,
    pending: Boolean,
    update: Function,
    submit: Function,
    cancel: Function
  },
  data() {
    return {
      createStyle: style => style
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.action-bar {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  justify-content: space-between;

  .input {
    flex: 1;
    margin: 5px;
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
  }

  .buttons {
    flex: 1 100%;
  }

  .create-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    border-color: #2c3e50;

    &.disabled {
      pointer-events: none;
      background-color: #aaa;
    }

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
