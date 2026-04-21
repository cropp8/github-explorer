<script setup lang="ts">
import { LoaderCircle } from '@lucide/vue';

import { usePositionedAncestorCheck } from '@/composables/positionedAncestorCheck';

const { isVisible = false } = defineProps<{
  isVisible?: boolean;
}>();

usePositionedAncestorCheck('BaseLoadingOverlay');
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="absolute inset-0 z-50 bg-white/30 dark:bg-gray-950/70 backdrop-blur-sm flex items-center justify-center text-gray-500"
    >
      <LoaderCircle :size="48" class="animate-spin" />
    </div>
  </Transition>
</template>
