export default {
  /* Jobs */
  setJobs: (state, jobs) => (state.jobs = jobs),
  addJob: (state, job) => state.jobs.push(job),

  /* Jobs deletion */
  removeJobById: (state, jobId) => {
    const index = state.jobs.findIndex(job => job.id === jobId)
    state.jobs.splice(index, 1)
  },
  addJobDeletionPending: (state, jobId) => state.jobDeletionPending.push(jobId),
  removeJobDeletionPending: (state, jobId) => {
    const index = state.jobs.findIndex(job => job.id === jobId)
    state.jobDeletionPending.splice(index, 1)
  },

  /* Job creation */
  setJobToCreate: (state, { label, value }) => {
    return label && value ? (state.jobToCreate[label] = value) : state
  },
  clearJobToCreate: state => {
    state.jobToCreate = {}
  },
  setJobCreationPending: (state, value) => (state.jobCreationPending = value),

  /* Job update */
  initJobToUpdate: (state, job) => {
    console.log({ state, job })
    return job !== undefined ? (state.jobToUpdate = job) : state
  },
  setJobToUpdate: (state, { label, value }) => {
    return label && value ? (state.jobToUpdate[label] = value) : state
  },
  clearJobToUpdate: state => {
    console.log(state.jobToUpdate)
    state.jobToUpdate = {}
  },
  updateJob: (state, updatedJob) => {
    const index = state.jobs.findIndex(job => job.id === updatedJob.id)
    state.jobs.splice(index, 1, state.jobToUpdate)
  },
  setJobUpdatePending: (state, value) => (state.jobUpdatePending = value)
}
