import JobsDB from '@/firebase/jobs-db'
import { firstDateOfYear, lastDateOfYear } from '@/support/date.support'

export default {
  /**
   * Fetch all jobs
   */
  getJobs: async ({ commit }) => {
    const jobsDb = new JobsDB()
    const jobs = await jobsDb.readAll()
    commit('setJobs', jobs)
  },

  /**
   * Fetch all jobs created after a date
   */
  getJobsAfterDate: async ({ commit }, date) => {
    const jobsDb = new JobsDB()
    const jobs = await jobsDb.readWhere([('createTimestamp', '>=', date)])
    commit('setJobs', jobs)
  },

  /**
   * Fetch all jobs created after a date
   */
  getJobsbyYear: async ({ commit }, year) => {
    const jobsDb = new JobsDB()
    const jobs = await jobsDb.readWhere([
      ('createTimestamp', '>=', firstDateOfYear(year)),
      ('createTimestamp', '>=', lastDateOfYear(year))
    ])
    commit('setJobs', jobs)
  },

  /**
   * Create a job for current loggedin user
   */
  createJob: async ({ commit, rootState }, job) => {
    const jobsDb = new JobsDB()

    job.userId = rootState.authentication.user.id

    commit('setJobCreationPending', true)
    const createdJob = await jobsDb.create(job)
    commit('addJob', createdJob)
    commit('setJobCreationPending', false)
  },

  /**
   * Create a new job for current loggedin user and reset job name input
   */
  triggerAddJobAction: ({ dispatch, state, commit }) => {
    if (state.jobNameToCreate === '') return
    const job = state.jobToCreate
    // {
    //   name: state.jobToCreate.Name,
    //   category: state.jobToCreate.Category,
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
    //   budgetedotherHours: state.jobToCreatebudgetedotherHours,
    //   totalBudgetedCost: state.jobToCreate.totalBudgetedCost,
    //   actualCostMaterials: state.jobToCreate.actualCostMaterials,
    //   totalInvoiceAmount: state.jobToCreate.totalInvoiceAmount
    // }
    commit('setJobToCreate', {})
    dispatch('createJob', job)
  },

  /**
   * Delete a user job from its id
   */
  deleteUserjob: async ({ rootState, commit, getters }, jobId) => {
    if (getters.isjobDeletionPending(jobId)) return

    const jobsDb = new JobsDB(rootState.authentication.user.id)

    commit('addjobDeletionPending', jobId)
    await jobsDb.delete(jobId)
    commit('removejobById', jobId)
    commit('removejobDeletionPending', jobId)
  }
}
