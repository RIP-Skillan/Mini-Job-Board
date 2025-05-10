<script setup lang="ts">
import { useRoute, useFetch, useRouter } from '#imports'

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
</script>

<template>
  <div v-if="job">
    <h1 class="text-3xl font-bold">{{ job.title }}</h1>
    <p class="text-lg text-gray-400 mt-2">{{ job.company }} — {{ job.location }}</p>
    <span class="inline-block bg-white text-black text-sm px-3 py-1 rounded mt-4">
      {{ job.type }}
    </span>
    <p class="mt-6 leading-7 text-gray-300">
      {{ job.description }}
    </p>
  </div>
</template>
