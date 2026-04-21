<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const toggleValue = (currentValue: boolean) => {
  emit('update:modelValue', !currentValue);
};
</script>

<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-label="`hardcoded text`"
    :class="modelValue ? 'bg-violet-600' : 'bg-gray-400 dark:bg-gray-700'"
    class="relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 cursor-pointer"
    @click="toggleValue(modelValue)"
  >
    <span
      :class="modelValue ? 'translate-x-8' : 'translate-x-1'"
      class="inline-flex h-5 w-5 transform rounded-full bg-white transition duration-300 ease-in-out"
    />
  </button>
</template>
