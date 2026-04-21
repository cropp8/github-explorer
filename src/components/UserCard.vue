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
        {{ `${user.name}` }}
      </h2>

      <a
        :href="user.html_url"
        rel="noopener noreferrer"
        target="_blank"
        class="text-sm font-semibold text-center text-indigo-500 hover:text-amber-600 dark:text-indigo-400 dark:hover:text-amber-300 transition-[color]"
      >
        {{ `@${user.login}` }}
      </a>
    </div>

    <div>
      <p class="flex gap-1 text-gray-500 dark:text-gray-400">
        <span><MapPin :size="16" :stroke-width="3" /></span>
        <strong>{{ user.location }}</strong>
      </p>

      <hr class="border-gray-300 dark:border-gray-700 my-4" />

      <ul>
        <StatListItem v-if="user.public_repos" :label="`Public repos`" :content="user.public_repos">
          <BookMarked :size="16" />
        </StatListItem>

        <StatListItem v-if="user.followers" :label="`Followers`" :content="user.followers">
          <UserCheck :size="16" />
        </StatListItem>

        <StatListItem v-if="user.following" :label="`Following`" :content="user.following">
          <Eye :size="16" />
        </StatListItem>
      </ul>
    </div>

    <hr class="border-gray-300 dark:border-gray-700 my-2" />

    <div class="text-xs">
      <!-- @TODO: truncate -->
      {{ user.bio }}
    </div>
  </div>
</template>
