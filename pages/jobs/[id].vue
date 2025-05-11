<!--
  This page displays the details of a specific job.

  It fetches job data from a JSON file and displays the job title, company, location, type, and description.

  Functionality:
    - Fetches job data from '/data/jobs.json'.
    - Extracts the job ID from the route parameters.
    - Finds the job with the matching ID in the fetched data.
    - If no job is found with the given ID, redirects to a 404 page.
    - Displays job details in a styled card.
    - Includes an "Apply" button that, when clicked, displays a thank you message.

  Question:
    - About the "Route Validation" for Job Details page, should we build it such a way that even editing the url with 
      /jobs/[id] manually would result in a valid page? If so i would use a onMounted() lifecycle hook to callback an asnync 
      function that would validate the route.
      (I've also mentioned this query in the Questions Section of my Readme.md file)
-->



<script setup lang="ts">
  import { useRoute, useFetch, useRouter } from '#imports'
  import { ref } from 'vue'

  const route = useRoute()
  const router = useRouter()

  // Job type Definition
  type Job = {
    id: string
    title: string
    company: string
    location: string
    type: string
    description: string
  }

  // Fetching Job Data
  const { data: jobs } = await useFetch<Job[]>('/data/jobs.json', {
    server: false
  })

  // Extracting Job ID from Route Parameters
  const job = computed(() => jobs.value?.find(j => j.id === route.params.id))

  // Redirecting to 404 Page if Job ID extracted from Route parameters doesn't exist
  if (!job.value) {
    router.replace('/404')
  }
  const showMessage = ref(false)
</script>

<template>
  <!-- Job Details Card -->
  <div v-if="job" class="flex justify-center mt-10">
    <div class="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-xl p-8 max-w-2xl w-full text-white">
    <h1 class="text-3xl font-bold">{{ job.title }}</h1>
    <p class="text-lg text-gray-400 mt-2">{{ job.company }} — {{ job.location }}</p>
    <span class="inline-block bg-white text-black text-sm px-3 py-1 rounded mt-4">
      {{ job.type }}
    </span>
    <p class="mt-6 leading-7 text-gray-300">
      {{ job.description }}
    </p>

    <!-- Job Apply Button -->
    <div v-if="!showMessage" class="flex justify-end">
      <button
        @click="showMessage = true"
        class="bg-purple-600 mt-5 hover:bg-purple-700 transition px-4 py-2 rounded text-white font-semibold"
      >
        Apply
      </button>
    </div>

    <!-- Thank You Message Displayed if Apply button is triggered-->
    <div
      v-if="showMessage"
      class="mt-4 p-3 bg-green-600/80 text-white rounded shadow-md transition-opacity duration-300"
    >
      Thank you for applying!
    </div>

  </div>
  </div>
</template>

<script >
</script>