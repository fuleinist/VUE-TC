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
      @input="
        setJobToCreate({
          label: $event.target.name,
          value: $event.target.value
        })
      "
    />
    <div
      :class="{ disabled: jobCreationPending }"
      class="create-job-btn"
      @click="triggerAddJobAction"
    >
      add job
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      inputs: [
        { name: 'firstname' },
        { name: 'surname' },
        { name: 'Phone' },
        { name: 'Email' },
        { name: 'BuilderName' },
        { name: 'BuilderEmail' },
        { name: 'BuilderPhone' },
        { name: 'projectDetails' },
        { name: 'projectAddress' },
        { name: 'projectSuburb' },
        { name: 'projectPostcode' },
        { name: 'nodes' },
        { name: 'quotedAmount' },
        { name: 'quotedRequestDate' },
        { name: 'quotedSubmissionDate' },
        { name: 'refferedBy' },
        { name: 'budgetedMaterialCost' },
        { name: 'budgetedFactoryHours' },
        { name: 'budgetedSiteHours' },
        { name: 'budgetedOtherHours' },
        { name: 'totalBudgetedCost' },
        { name: 'budgetedOtherHours' },
        { name: 'actualCostMaterials' },
        { name: 'totalInvoiceAmount' }
      ]
      //   {
      //   firstname: state.jobToCreate.FirstName,
      //   surname: state.jobToCreate.SurName,
      //   phone: state.jobToCreate.Phone,
      //   email: state.jobToCreate.Email,
      //   builderName: state.jobToCreate.BuilderName,
      //   builderEmail: state.jobToCreate.BuilderEmail,
      //   builderPhone: state.jobToCreate.BuilderPhone,
      //   projectDetails: state.jobToCreate.projectDetails,
      //   projectAddress: state.jobToCreate.projectAddress,
      //   projectSuburb: state.jobToCreate.projectSuburb,
      //   projectPostcode: state.jobToCreate.projectPostcode,
      //   notes: state.jobToCreate.nodes,
      //   quotedAmount: state.jobToCreate.quotedAmount,
      //   quotedRequestDate: state.jobToCreate.quotedRequestDate,
      //   quotedSubmissionDate: state.jobToCreate.quotedSubmissionDate,
      //   refferedBy: state.jobToCreate.refferedBy,
      //   budgetedMaterialCost: state.jobToCreate.budgetedMaterialCost,
      //   budgetedFactoryHours: state.jobToCreate.budgetedFactoryHours,
      //   budgetedSiteHours: state.jobToCreate.budgetedSiteHours,
      //   budgetedotherHours: state.jobToCreate.budgetedotherHours,
      //   totalBudgetedCost: state.jobToCreate.totalBudgetedCost,
      //   actualCostMaterials: state.jobToCreate.actualCostMaterials,
      //   totalInvoiceAmount: state.jobToCreate.totalInvoiceAmount
    }
  },
  computed: mapState('jobs', ['jobToCreate', 'jobCreationPending']),
  methods: {
    ...mapMutations('jobs', ['setJobToCreate']),
    ...mapActions('jobs', ['triggerAddJobAction'])
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
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
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
