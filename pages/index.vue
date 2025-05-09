<template>
  <div class="relative min-h-screen px-4 py-8 bg-gradient-to-br from-gray-900 to-black text-white">
    <!-- 3D Gradient Blobs for Aesth -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-1/4 w-72 h-72 bg-purple-600 blur-[100px] opacity-30 rounded-full"></div>
      <div class="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-600 blur-[100px] opacity-30 rounded-full"></div>
    </div>

    <!-- Job Filter Panel -->
    <div class="relative z-10 w-full max-w-2xl p-8 mx-auto bg-white/5 backdrop-blur-md rounded-2xl shadow-xl ring-1 ring-white/10 animate-fade-in">
      <h1 class="text-3xl font-semibold mb-6 text-center">Find Your Next Job</h1>
      <div class="space-y-4">
        <input
          v-model="titleFilter"
          type="text"
          placeholder="Search job titles..."
          class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div class="flex gap-4">
          <Custom-Select v-model="location" :options="['All Locations', 'Bangalore', 'Remote']" />
          <Custom-Select v-model="jobType" :options="['All Types', 'Full-time', 'Internship']" />
        </div>
      </div>
    </div>

    <div class="relative z-10 mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      <JobCard
        v-for="job in filteredJobs"
        :key="job.id"
        :title="job.title"
        :company="job.company"
      />
    </div>
    <div
      v-if="filteredJobs.length === 0"
      class="text-center text-white/80 mt-10 text-lg"
    >
      🚫 No jobs found matching your criteria.
    </div>

  </div>
</template>

<script setup>
import JobCard from '~/components/JobCard.vue'

const { data: jobs } = await useFetch('./data/jobs.json')

const titleFilter = ref('')
const locationFilter = ref('All Locations')
const typeFilter = ref('All Types')


const filteredJobs = computed(() => {
  if (!jobs.value) return []
  console.log('Loaded jobs:', jobs.value)

  return jobs.value.filter(job => {
    const matchTitle = job.title.toLowerCase().includes(titleFilter.value.toLowerCase())
    const matchLocation = locationFilter.value === 'All Locations' || job.location === locationFilter.value
    const matchType = typeFilter.value === 'All Types' || job.type === typeFilter.value
    return matchTitle && matchLocation && matchType
  })
})

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

