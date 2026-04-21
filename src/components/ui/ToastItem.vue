<script setup lang="ts">
import { X, CircleAlert, CircleCheck, Info } from '@lucide/vue';

import type { ToastType } from '@/types/toast';

defineProps<{
  message: string;
  type: ToastType;
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <div
    class="flex items-center gap-3 p-4 rounded-lg shadow-lg border min-w-75 pointer-events-auto"
    :class="{
      'bg-pink-50 border-pink-200 text-pink-800 dark:text-pink-500 dark:bg-pink-950/50 dark:border-pink-900':
        type === 'error',
      'bg-teal-50 border-teal-200 text-teal-800 dark:text-teal-500 dark:bg-teal-950/50 dark:border-teal-900':
        type === 'success',
      'bg-gray-50 border-gray-200 text-gray-800 dark:text-gray-500 dark:bg-gray-950/50 dark:border-gray-900':
        type === 'info',
    }"
  >
    <component
      :is="type === 'error' ? CircleAlert : type === 'success' ? CircleCheck : Info"
      :size="20"
    />

    <span class="flex-1 text-sm font-medium">{{ message }}</span>

    <button @click="emit('close')" class="hover:opacity-70">
      <X :size="16" />
    </button>
  </div>
</template>
