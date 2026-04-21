<script setup lang="ts">
import type { VNode } from 'vue';

defineProps<{
  label: string;
  contentClass?: string | string[];
  content?: string | number;
  noTruncate?: boolean;
}>();

defineSlots<{
  default(props?: Record<string, never>): VNode[];
}>();
</script>

<template>
  <li class="flex gap-1">
    <span class="text-amber-600 empty:hidden pt-0.5">
      <slot />
    </span>

    <span :class="{ truncate: !noTruncate }">
      <strong>{{ label }}: </strong>
      <span :class="contentClass"> {{ content }} </span>
    </span>
  </li>
</template>
