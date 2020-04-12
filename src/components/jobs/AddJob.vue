<template>
  <div class="job-action-bar">
    <input
      v-for="(input, index) in inputs"
      :key="index"
      :placeholder="input.name"
      class="job-input"
      :name="input.name"
      type="text"
      :value="jobToCreate ? jobToCreate[input.name] : null"
      :style="createStyle(input.style)"
      @input="
        setJobToCreate({
          label: $event.target.name,
          value: $event.target.value
        })
      "
    />
    <div class="job-buttons">
      <br />
      <div
        :class="{ disabled: jobCreationPending }"
        class="create-job-btn"
        @click="addJobAction"
      >
        Add Job
      </div>
      <div
        :class="{ disabled: jobCreationPending }"
        class="create-job-btn"
        @click="clearJobToCreate(jobToCreate)"
      >
        Clear
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import delay from 'delay'

export default {
  data() {
    return {
      inputs: [
        { name: 'Name', style: { flex: '1 100%' } },
        { name: 'Firstname' },
        { name: 'Surname' },
        { name: 'Phone' },
        { name: 'Email' },
        { name: 'BuilderName' },
        { name: 'BuilderEmail' },
        { name: 'BuilderPhone' },
        { name: 'ProjectDetails' },
        { name: 'ProjectAddress' },
        { name: 'ProjectSuburb' },
        { name: 'ProjectPostcode' },
        { name: 'Nodes', style: { flex: '1 100%', height: '50px' } },
        { name: 'QuotedAmount' },
        { name: 'QuotedRequestDate' },
        { name: 'QuotedSubmissionDate' },
        { name: 'RefferedBy' },
        { name: 'BudgetedMaterialCost' },
        { name: 'BudgetedFactoryHours' },
        { name: 'BudgetedSiteHours' },
        { name: 'BudgetedOtherHours' },
        { name: 'TotalBudgetedCost' },
        { name: 'BudgetedOtherHours' },
        { name: 'ActualCostMaterials' },
        { name: 'TotalInvoiceAmount' }
      ],
      createStyle: style => style
    }
  },
  computed: mapState('jobs', ['jobToCreate', 'jobCreationPending']),
  methods: {
    ...mapMutations('jobs', ['setJobToCreate', 'clearJobToCreate']),
    ...mapActions('jobs', ['triggerAddJobAction']),
    async addJobAction() {
      this.triggerAddJobAction()
      this.$notify({
        group: 'jobs',
        type: 'success',
        title: 'Job Added',
        text: 'A New Job is Added'
      })
      await delay(1000)
      this.$router.push('/jobs')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.job-action-bar {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  justify-content: space-between;

  .job-input {
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

  .job-buttons {
    flex: 1 100%;
  }

  .create-job-btn {
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
