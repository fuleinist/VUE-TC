import JobsDB from '@/firebase/jobs-db'

export default {
  /**
   * Fetch jobs of current loggedin user
   */
  getJobs: async ({ rootState, commit }) => {
    const jobsDb = new JobsDB(rootState.authentication.user.id)
    const jobs = await jobsDb.readAll()
    console.log(jobs)
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

    const job = {
      name: state.jobNameToCreate,
      category: state.jobCategoryToCreate,
      firstname: state.jobFirstNameToCreate,
      surname: state.jobSurNameToCreate,
      phone: state.jobPhoneToCreate,
      email: state.jobEmailToCreate,
      builderName: state.jobBuilderNameToCreate,
      builderEmail: state.jobBuilderEmailToCreate,
      builderPhone: state.jobBuilderPhoneToCreate,
      projectDetails: state.projectDetailsToCreate,
      projectAddress: state.projectAddressToCreate,
      projectSuburb: state.projectSuburbToCreate,
      projectPostcode: state.projectPostcodeToCreate,
      notes: state.nodesToCreate,
      quotedAmount: state.quotedAmountToCreate,
      quotedRequestDate: state.quotedAmountToCreate,
      quotedSubmissionDate: state.quotedSubmissionDateToCreate,
      refferedBy: state.refferedByToCreate,
      budgetedMaterialCost: state.budgetedMaterialCostToCreate,
      budgetedFactoryHours: state.budgetedFactoryHoursToCreate,
      budgetedSiteHours: state.budgetedSiteHoursToCreate,
      budgetedotherHours: state.budgetedotherHoursToCreate,
      totalBudgetedCost: state.totalBudgetedCostToCreate,
      actualCostMaterials: state.actualCostMaterialsToCreate,
      totalInvoiceAmount: state.totalInvoiceAmountToCreate
    }

    commit('setJobNameToCreate', '')
    commit('setJobCategoryToCreate', '')
    commit('setJobCountToCreate', 0)
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
