<script setup lang="ts">
import { BookMarked, UserCheck, Eye, MapPin } from '@lucide/vue';

import type { GitHubUser } from '@/types/github';

import StatListItem from './ui/StatListItem.vue';

// @TODO: withDefaults
defineProps<{
  user: GitHubUser;
}>();
</script>

<template>
  <div class="rounded-lg bg-gray-200 dark:bg-gray-800 p-4 flex flex-col gap-2">
    <div class="flex justify-center">
      <div class="rounded-full overflow-hidden w-25">
        <img :src="user.avatar_url" />
      </div>
    </div>

    <div class="text-center">
      <h2 class="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
        <template v-if="user.name">
          {{ user.name }}
        </template>

        <a
          v-else
          :href="user.html_url"
          rel="noopener noreferrer"
          target="_blank"
          class="font-semibold text-center text-indigo-500 hover:text-amber-600 dark:text-indigo-400 dark:hover:text-amber-300 transition-[color]"
        >
          {{ `@${user.login}` }}
        </a>
      </h2>

      <a
        v-if="user.name"
        :href="user.html_url"
        rel="noopener noreferrer"
        target="_blank"
        class="text-sm font-semibold text-center text-indigo-500 hover:text-amber-600 dark:text-indigo-400 dark:hover:text-amber-300 transition-[color]"
      >
        {{ `@${user.login}` }}
      </a>
    </div>

    <div>
      <p v-if="user.location" class="flex gap-1 text-gray-500 dark:text-gray-400">
        <MapPin :size="16" :stroke-width="3" />
        <strong>{{ user.location }}</strong>
      </p>

      <hr class="border-gray-300 dark:border-gray-700 my-4" />

      <ul>
        <StatListItem :label="`Public repos`" :content="user.public_repos">
          <template #icon>
            <BookMarked :size="16" />
          </template>
        </StatListItem>

        <StatListItem :label="`Followers`" :content="user.followers">
          <template #icon>
            <UserCheck :size="16" />
          </template>
        </StatListItem>

        <StatListItem :label="`Following`" :content="user.following">
          <template #icon>
            <Eye :size="16" />
          </template>
        </StatListItem>
      </ul>
    </div>

    <template v-if="user.bio">
      <hr class="border-gray-300 dark:border-gray-700 my-2" />

      <div class="text-xs">
        <!-- @TODO: truncate -->
        {{ user.bio }}
      </div>
    </template>
  </div>
</template>
