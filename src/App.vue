<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import { useGitHubStore } from '@/stores/github';
import { useTheme } from '@/composables/theme';

import BaseContainer from '@/components/layout/BaseContainer.vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import ToastContainer from '@/components/ui/ToastContainer.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

const store = useGitHubStore();
const { initTheme } = useTheme();

initTheme();

onMounted(async () => {
  store.initHistory();
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-[bg-color]"
  >
    <TheHeader />

    <main class="grow pt-21 pb-10 text-base relative">
      <BaseContainer>
        <RouterView />
      </BaseContainer>
    </main>

    <TheFooter />
  </div>

  <ToastContainer />
</template>

<style scoped></style>
