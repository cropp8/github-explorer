<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { useGitHubStore } from '@/stores/github';

import UserCard from '@/components/UserCard.vue';
import RepoCard from '@/components/RepoCard.vue';

const route = useRoute();
const githubStore = useGitHubStore();

watch(
  () => route.params.username,
  (newUsername) => {
    if (newUsername) {
      githubStore.fetchUser(newUsername as string);
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
        class="col-span-9 rounded-lg bg-white dark:bg-gray-950 p-4 min-h-full grid grid-cols-subgrid gap-y-4 gap-x-3 content-start"
      >
        <template v-if="githubStore.repos.length > 0">
          <h2 class="col-span-9 text-2xl font-semibold py-2">
            Public repositories of user
            <span
              class="inline-block px-1 rounded-sm bg-gray-200 dark:bg-gray-900 dark:text-gray-400"
              >@{{ githubStore.user.login }}</span
            >
          </h2>
          <RepoCard v-for="repo in githubStore.repos" :key="repo.id" :repo="repo" />
        </template>

        <div v-else class="col-span-9 flex items-center justify-center py-10">
          <div class="text-xl text-center text-gray-600">This user has no public repositories.</div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>no user</div>
</template>
