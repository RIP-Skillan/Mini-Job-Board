<!--
  This component renders a job card displaying the job title and company.

  Props:
    - title: String - The title of the job.
    - company: String - The name of the company offering the job.

  Functionality:
    - Displays the job title as a main heading.
    - Displays the company name as a subheading.
    - Applies styling for a visually appealing card with a semi-transparent background, rounded corners, and a subtle shadow.
    - Includes a hover effect to highlight the card on mouseover.
    - Uses a fade-in animation to smoothly reveal the card on the page.
-->


<template>
  <div
    class="p-4 w-full bg-white/5 backdrop-blur-md rounded-xl shadow-md ring-1 ring-white/10 opacity-0 animate-fade-in hover:bg-white/10 border border-white/20"
  >
    <h2 class="text-xl font-semibold text-white">{{ title }}</h2>
    <p class="text-sm text-gray-300">{{ company }}</p>
  </div>
</template>

<script setup>
  defineProps({
    title: String,
    company: String
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
