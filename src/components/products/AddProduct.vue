<template>
  <div class="product-action-bar">
    <input
      placeholder="product name..."
      class="product-input"
      type="text"
      :value="productNameToCreate"
      @input="setProductNameToCreate($event.target.value)"
    />
    <input
      placeholder="product catalog..."
      class="product-input"
      type="text"
      :value="productCategoryToCreate"
      @input="setProductCategoryToCreate($event.target.value)"
    />
    <input
      placeholder="product count..."
      class="product-input"
      type="number"
      :value="productCountToCreate"
      @input="setProductCountToCreate($event.target.value)"
    />
    <div
      :class="{ disabled: productCreationPending }"
      class="create-product-btn"
      @click="triggerAddProductAction"
    >
      add product
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: mapState('products', [
    'productNameToCreate',
    'productCategoryToCreate',
    'productCountToCreate',
    'productCreationPending'
  ]),
  methods: {
    ...mapMutations('products', ['setProductNameToCreate']),
    ...mapMutations('products', ['setProductCategoryToCreate']),
    ...mapMutations('products', ['setProductCountToCreate']),
    ...mapActions('products', ['triggerAddProductAction'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.product-action-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  .product-input {
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
  }

  .create-product-btn {
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
