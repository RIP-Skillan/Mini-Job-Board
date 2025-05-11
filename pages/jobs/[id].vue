<script setup lang="ts">
  import { useRoute, useFetch, useRouter } from '#imports'
  import { ref } from 'vue'

  const route = useRoute()
  const router = useRouter()

  type Job = {
    id: string
    title: string
    company: string
    location: string
    type: string
    description: string
  }

  const { data: jobs } = await useFetch<Job[]>('/data/jobs.json', {
    server: false
  })

  const job = computed(() => jobs.value?.find(j => j.id === route.params.id))

  if (!job.value) {
    router.replace('/404')
  }
  const showMessage = ref(false)
</script>

<template>
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

    <div v-if="!showMessage" class="flex justify-end">
      <button
        @click="showMessage = true"
        class="bg-purple-600 mt-5 hover:bg-purple-700 transition px-4 py-2 rounded text-white font-semibold"
      >
        Apply
      </button>
    </div>

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