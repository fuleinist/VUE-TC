<template>
  <div class="job-action-bar">
    <input
      v-for="(input, index) in inputs"
      :key="index"
      :placeholder="input.name"
      class="job-input"
      :name="input.name"
      type="text"
      :value="jobToUpdate ? jobToUpdate[input.name] : null"
      :style="createStyle(input.style)"
      @input="
        setJobToUpdate({
          label: $event.target.name,
          value: $event.target.value
        })
        test()
      "
    />
    <div class="job-buttons">
      <br />
      <div
        :class="{ disabled: jobUpdatePending }"
        class="create-job-btn"
        @click="triggerUpdateJobAction"
      >
        Update
      </div>
      <div
        :class="{ disabled: jobUpdatePending }"
        class="create-job-btn"
        @click="clearJobToUpdate(jobToUpdate)"
      >
        Clear
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

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
      //   {
      //   firstname: state.jobToUpdate.FirstName,
      //   surname: state.jobToUpdate.SurName,
      //   phone: state.jobToUpdate.Phone,
      //   email: state.jobToUpdate.Email,
      //   builderName: state.jobToUpdate.BuilderName,
      //   builderEmail: state.jobToUpdate.BuilderEmail,
      //   builderPhone: state.jobToUpdate.BuilderPhone,
      //   projectDetails: state.jobToUpdate.projectDetails,
      //   projectAddress: state.jobToUpdate.projectAddress,
      //   projectSuburb: state.jobToUpdate.projectSuburb,
      //   projectPostcode: state.jobToUpdate.projectPostcode,
      //   notes: state.jobToUpdate.nodes,
      //   quotedAmount: state.jobToUpdate.quotedAmount,
      //   quotedRequestDate: state.jobToUpdate.quotedRequestDate,
      //   quotedSubmissionDate: state.jobToUpdate.quotedSubmissionDate,
      //   refferedBy: state.jobToUpdate.refferedBy,
      //   budgetedMaterialCost: state.jobToUpdate.budgetedMaterialCost,
      //   budgetedFactoryHours: state.jobToUpdate.budgetedFactoryHours,
      //   budgetedSiteHours: state.jobToUpdate.budgetedSiteHours,
      //   budgetedotherHours: state.jobToUpdate.budgetedotherHours,
      //   totalBudgetedCost: state.jobToUpdate.totalBudgetedCost,
      //   actualCostMaterials: state.jobToUpdate.actualCostMaterials,
      //   totalInvoiceAmount: state.jobToUpdate.totalInvoiceAmount
    }
  },
  computed: {
    ...mapState('jobs', ['jobToUpdate', 'jobUpdatePending']),
    ...mapGetters('jobs', ['getJobById'])
  },
  created() {
    this.initJobToUpdate(this.getJobById(this.$route.params.id))
  },
  methods: {
    ...mapMutations('jobs', [
      'setJobToUpdate',
      'clearJobToUpdate',
      'initJobToUpdate'
    ]),
    ...mapActions('jobs', ['triggerUpdateJobAction']),
    test() {
      console.log(this.jobToUpdate)
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
