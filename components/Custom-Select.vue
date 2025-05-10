<template>
  <Listbox v-model="selected">
    <div class="relative flex-1 z-10">
      <ListboxButton
        class="w-full flex-1 py-2 px-4 text-left bg-white/10 text-white border border-white/20 rounded-md backdrop-blur-md focus:outline-none"
      >
        {{ selected }}
        <span class="absolute right-4 text-white">▼</span>
      </ListboxButton>

      <Transition
        enter="transition duration-100 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="transition duration-75 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <ListboxOptions
          class="absolute mt-2 w-full rounded-md bg-gradient-to-r from-[#2d2d44cc] to-[#1c1c2ccc] text-white shadow-lg backdrop-blur-md border border-white/20 z-50 overflow-hidden"
        >
          <ListboxOption
            v-for="item in options"
            :key="item"
            :value="item"
            class="px-4 py-2 cursor-pointer hover:bg-white/10"
          >
            {{ item }}
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const props = defineProps({
  modelValue: String,
  options: Array
})

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue || props.options[0])

watch(selected, (val) => emit('update:modelValue', val))
</script>
