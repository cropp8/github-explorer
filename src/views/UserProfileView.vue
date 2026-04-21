<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { useGitHubStore } from '@/stores/github';

import UserCard from '@/components/UserCard.vue';
import RepoList from '@/components/RepoList.vue';
import BaseLoadingOverlay from '@/components/ui/BaseLoadingOverlay.vue';

const route = useRoute();
const githubStore = useGitHubStore();

watch(
  [() => route.params.username, () => route.query.page],
  ([newUsername, newPage], [oldUsername, oldPage]) => {
    if (newUsername !== oldUsername) {
      if (newUsername) {
        githubStore.fetchUser(newUsername as string);
      }

      return;
    }

    if (newPage !== oldPage) {
      githubStore.fetchRepos(newUsername as string, Number(newPage) || 1);
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div v-if="githubStore.user">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3">
        <UserCard :user="githubStore.user" />
      </div>

      <div
        class="col-span-9 rounded-lg bg-white dark:bg-gray-950 p-4 min-h-full grid grid-cols-subgrid gap-y-4 gap-x-3 content-start relative"
      >
        <RepoList />

        <BaseLoadingOverlay :is-visible="githubStore.reposLoading && !githubStore.userLoading" />
      </div>
    </div>
  </div>

  <div
    v-else-if="githubStore.error"
    class="col-span-9 rounded-lg bg-white dark:bg-gray-950 p-4 min-h-60 flex flex-col gap-2 items-center justify-center text-center"
  >
    <h2 class="text-2xl font-medium">
      {{ githubStore.error }}
    </h2>
    <p class="text-gray-500">Check the spelling or try another user.</p>
    <RouterLink
      :to="{ name: 'home' }"
      class="rounded-lg mt-4 bg-violet-500 text-white flex gap-1 items-center py-1 px-2 cursor-pointer hover:bg-violet-600 transition-colors active:bg-violet-700 font-semibold"
    >
      Go back home
    </RouterLink>
  </div>

  <BaseLoadingOverlay :is-visible="githubStore.userLoading" />
</template>
