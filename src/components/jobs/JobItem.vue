<template>
  <div class="job-item">
    <router-link
      class="job-link"
      :to="{ name: 'job', params: { id: data.id } }"
    >
      # {{ index }} {{ data.name }} {{ data.category }} {{ data.count }}
    </router-link>
    <div
      v-if="!disableActions"
      class="update-btn"
      @click="goJobUpdate(data.id)"
    >
      {{ 'update' }}
    </div>
    <div
      v-if="!disableActions"
      class="delete-btn"
      @click="$emit('deleteJob', data.id)"
    >
      {{ isJobDeletionPending ? 'delete in progress...' : 'delete' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    index: Number,
    isJobDeletionPending: Boolean,
    disableActions: Boolean
  },
  methods: {
    goJobUpdate(id) {
      const redirectUrl = `/job/update/${id}`
      this.$router.push(redirectUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.job-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .job-link {
    color: $vue-color;
  }

  .update-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    color: $vue-color;
    border-color: $vue-color;
  }

  .delete-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    color: $danger-color;
    border-color: $danger-color;
  }
}
</style>
