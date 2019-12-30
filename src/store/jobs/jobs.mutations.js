export default {
  /* Job input name */
  setJobNameToCreate: (state, jobNameToCreate) =>
    (state.jobNameToCreate = jobNameToCreate),
  /* Job input category */
  setJobCategoryToCreate: (state, jobCategoryToCreate) =>
    (state.jobCategoryToCreate = jobCategoryToCreate),

  /* Job input category */
  setJobCountToCreate: (state, jobCountToCreate) =>
    (state.jobCountToCreate = jobCountToCreate),
  /* Jobs */
  setJobs: (state, jobs) => (state.jobs = jobs),
  addJob: (state, job) => state.jobs.push(job),
  removeJobById: (state, jobId) => {
    const index = state.jobs.findIndex(job => job.id === jobId)
    state.jobs.splice(index, 1)
  },

  /* Jobs deletion */
  addJobDeletionPending: (state, jobId) => state.jobDeletionPending.push(jobId),
  removeJobDeletionPending: (state, jobId) => {
    const index = state.jobs.findIndex(job => job.id === jobId)
    state.jobDeletionPending.splice(index, 1)
  },

  /* Job creation */
  setJobCreationPending: (state, value) => (state.jobCreationPending = value)
}
