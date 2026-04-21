<script setup lang="ts">
import { Star, GitFork, Code, History } from '@lucide/vue';

import type { GitHubRepo } from '@/types/github';
import StatListItem from '@/components/ui/StatListItem.vue';
import { getLanguageBgColorClass } from '@/constants';

// @TODO: withDefaults
defineProps<{
  repo: GitHubRepo;
}>();
</script>

<template>
  <div
    class="relative group overflow-hidden col-span-3 p-3 bg-white dark:bg-gray-900 rounded-md wrap-break-word hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/20 border-2 border-gray-100 hover:border-gray-200 transition-all dark:hover:shadow-none dark:border-gray-700 dark:hover:translate-0 dark:hover:border-gray-600"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-radial-[circle_at_center] from-violet-400/20 to-transparent from-10% opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden dark:block"
    ></div>

    <div class="relative flex flex-col gap-2 h-full">
      <h3 class="font-semibold text-lg leading-5 pb-1">
        <a
          :href="repo.html_url"
          rel="noopener noreferrer"
          target="_blank"
          class="font-semibold text-center text-indigo-500 hover:text-amber-600 dark:text-indigo-400 dark:hover:text-amber-300 transition-[color]"
        >
          {{ repo.name }}
        </a>
      </h3>

      <p class="text-xs">{{ repo.description }}</p>

      <ul class="mt-auto">
        <StatListItem :label="`Stars`" :content="repo.stargazers_count">
          <Star :size="16" />
        </StatListItem>

        <StatListItem :label="`Forks`" :content="repo.forks_count">
          <GitFork :size="16" />
        </StatListItem>

        <StatListItem
          v-if="repo.language"
          :label="`Language`"
          :content="repo.language"
          :content-class="[
            'px-1 rounded-sm inline-block text-xs font-semibold',
            getLanguageBgColorClass(repo.language),
          ]"
        >
          <Code :size="16" />
        </StatListItem>

        <StatListItem :label="`Last updated`" :content="repo.updated_at" no-truncate>
          <History :size="16" />
        </StatListItem>
      </ul>
    </div>
  </div>
</template>
