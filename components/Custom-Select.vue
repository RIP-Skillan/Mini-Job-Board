<!--
  This component renders a custom select input using Headless UI's Listbox component.
  It allows users to select an option from a dropdown list.

  Props:
    - modelValue: String - The currently selected value. This prop is used for two-way binding with the parent component using v-model.
    - options: Array - An array of strings representing the options available in the dropdown.

  Emits:
    - update:modelValue: This event is emitted when the selected value changes. The new selected value is passed as the event payload.

  Functionality:
    - Displays a button with the currently selected value.
    - Clicking the button opens a dropdown list of options.
    - Selecting an option from the list updates the selected value and closes the dropdown.
    - Uses transitions for smooth opening and closing of the dropdown.
    - Styles the select input with a semi-transparent background, rounded corners, and a border.
-->


<template>
  <Listbox v-model="selected">
    <div class="relative flex-1 z-10">

      <!-- Dropdown button -->
      <ListboxButton
        class="w-full flex-1 py-2 px-4 text-left cursor-pointer bg-white/10 text-white border border-white/20 rounded-md backdrop-blur-md focus:outline-none"
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
        <!-- Dropdown options -->
        <ListboxOptions
          class="absolute mt-2 w-full rounded-md bg-gradient-to-r from-[#000000cc] to-[#41415fcc] text-white shadow-lg backdrop-blur-md border border-white/20 z-50 overflow-hidden"
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
