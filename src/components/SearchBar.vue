<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from '@lucide/vue';

const router = useRouter();
const route = useRoute();

const query = ref('');

const handleSearch = () => {
  const sanitizedQuery = query.value.trim();

  if (!sanitizedQuery) {
    router.push({ name: 'home' });

    return;
  }

  router.push({
    name: 'user-profile',
    params: {
      username: sanitizedQuery,
    },
  });
};

watch(
  () => route.params.username,
  (newUsername) => {
    query.value = (newUsername as string) ?? '';
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <form role="search" @submit.prevent="handleSearch" class="flex gap-2">
      <label for="github-search" class="sr-only"> Search GitHub username </label>

      <input
        id="github-search"
        v-model="query"
        type="search"
        placeholder="GitHub username"
        class="rounded-lg bg-white dark:bg-gray-900 border-gray-300 hover:border-gray-400 dark:border-gray-600 border-2 px-2 py-1 focus:outline-0 focus:border-violet-500 cursor-pointer placeholder:text-gray-500 transition-colors grow"
      />

      <button
        type="submit"
        class="rounded-lg bg-violet-500 text-white flex gap-1 items-center py-1 px-2 cursor-pointer hover:bg-violet-600 transition-colors active:bg-violet-700 font-semibold"
      >
        <Search :size="14" :stroke-width="3.5" aria-hidden="true" />
        search
      </button>
    </form>
  </div>
</template>
