<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
    <div class="relative min-h-screen px-4 py-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <!-- 3D Gradient Blobs for Aesth -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-10 left-1/4 w-72 h-72 bg-purple-600 blur-[100px] opacity-30 rounded-full"></div>
        <div class="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-600 blur-[100px] opacity-30 rounded-full"></div>
      </div>
      <slot />
    </div>
  </div>

</template>