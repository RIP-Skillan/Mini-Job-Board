<!--
  This is the main page of the application, displaying a job listing with filtering and pagination.

  Functionality:
    - Fetches job data from '/data/jobs.json'.
    - Provides filtering options for job titles, locations, and types.
    - Displays jobs that match the filter criteria.
    - Implements pagination to navigate through job listings.
    - Shows a message when no jobs match the current filter.

  Components:
    - JobCard: Displays individual job details.
    - Custom-Select: Custom select input for filtering.

  Data:
    - jobs: Array of job objects fetched from the server.
    - jobTitleFilter: Ref for the job title filter input.
    - jobLocationFilter: Ref for the selected job location filter.
    - jobTypeFilter: Ref for the selected job type filter.
    - filteredJobs: Computed property that filters jobs based on the selected criteria.
    - currentPage: Ref for the current page number in pagination.
    - totalPages: Ref for the total number of pages in pagination.
    - paginatedItems: Computed property that returns the jobs for the current page.

  Methods:
    - goToPage(pageNumber): Changes the current page to the specified page number.
-->

<template>
    <!-- Job Filter Panel -->
    <div class="relative z-10 w-full max-w-2xl p-8 mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-xl ring-1 ring-white/10 animate-fade-in">
      <h1 class="text-3xl font-semibold mb-6 text-center">Find Your Next Job</h1>
      <div class="space-y-4">
        <input
          v-model="jobTitleFilter"
          type="text"
          placeholder="Search job titles..."
          class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div class="flex gap-4">
          <Custom-Select v-model="jobLocationFilter" :options="['All Locations', 'Bangalore', 'Chennai', 'Hyderabad', 'Remote']" />
          <Custom-Select v-model="jobTypeFilter" :options="['All Types', 'Full-time', 'Part-time', 'Internship', 'Contract']" />
        </div>
      </div>
    </div>

    <!-- Filtered Job Listing -->
    <div class="relative z-9 mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      <NuxtLink
        v-for="job in paginatedItems"
        :key="job.id"
        :to="`/jobs/${job.id}`"
        class="block"
      >
        <JobCard :title="job.title" :company="job.company" />
      </NuxtLink>
    </div>

    <!-- Pagination Navigation-->
    <div class="flex justify-center fixed bottom-1/3 left-1/2 -translate-x-1/2 mt-6 gap-2 text-white">
      <button
        v-for="n in totalPages"
        :key="n"
        :class="[
          'px-3 py-1 z-11 rounded-full border transition-colors duration-300 cursor-pointer',
          currentPage === n ? 'bg-white text-black' : 'bg-transparent border-white'
        ]"
        @click="goToPage(n)"
      >
        {{ n }}
      </button>
    </div>

    <!-- Message for when no jobs match the filter -->
    <div
      v-if="filteredJobs.length === 0"
      class="text-center text-white/80 mt-10 text-lg"
    >
      No jobs found matching your criteria.
    </div>
</template>

<script setup lang="ts">
  import JobCard from '~/components/JobCard.vue'

  type Job = {
    id: string
    title: string
    company: string
    location: string
    type: string
    description: string
  }

  const { data: jobs } = await useFetch<Job[]>('/data/jobs.json',{server: false})
  //console.log('Loaded jobs:', jobs)   This line was used for testing purposes

  // Refs for Filtering
  const jobTitleFilter = ref('')
  const jobLocationFilter = ref('All Locations')
  const jobTypeFilter = ref('All Types')

  // Filtering Jobs based on selected criteria
  const filteredJobs = computed(() => {
    if (!jobs.value) return []

    return jobs.value.filter(job => {
      const matchTitle = job.title.toLowerCase().includes(jobTitleFilter.value.toLowerCase())
      const matchLocation = jobLocationFilter.value === 'All Locations' || job.location === jobLocationFilter.value
      const matchType = jobTypeFilter.value === 'All Types' || job.type === jobTypeFilter.value
      return matchTitle && matchLocation && matchType
    })
  })

  // Whenever results are filtered, reset the current page to 1 to see the new results without any bugs
  watch([jobTitleFilter, jobLocationFilter, jobTypeFilter], () => {
    currentPage.value = 1
  })

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage
  } = usePagination(filteredJobs, 5)

</script>


<style scoped>
  @keyframes fade-in {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }

</style>

