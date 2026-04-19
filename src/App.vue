<script setup lang="ts">
import { onMounted } from 'vue';

import { useGitHubStore } from '@/stores/github';
import { useTheme } from '@/composables/theme';

const store = useGitHubStore();
const { toggleTheme, initTheme } = useTheme();

onMounted(async () => {
  store.initHistory();
  initTheme();
});
</script>

<template>
  <h1>github explorer</h1>
  <br>
  <button type="button" @click="toggleTheme">toggle theme</button>
</template>

<style scoped></style>
