<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Sun, MoonStar } from '@lucide/vue';

import { useTheme } from '@/composables/theme';

import BaseContainer from '@/components/layout/BaseContainer.vue';
import TheLogoIcon from '@/components/layout/TheLogoIcon.vue';
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';
import SearchBar from '@/components/SearchBar.vue';

const { isDarkTheme } = useTheme();
</script>

<template>
  <header class="bg-violet-300 dark:bg-gray-800 transition-[bg-color]">
    <BaseContainer class="py-1 sm:py-2">
      <div class="grid grid-cols-12 items-center">
        <div class="col-span-3">
          <RouterLink
            :to="{ name: 'home' }"
            class="inline-flex p-2 hover:opacity-80 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="GitHub Explorer Home"
          >
            <TheLogoIcon />
          </RouterLink>
        </div>
        <div class="col-span-6">
          <SearchBar />
        </div>
        <div class="col-span-3 flex justify-end">
          <div class="flex gap-2 items-center">
            <Sun :size="20" aria-hidden="true" />
            <ToggleSwitch v-model="isDarkTheme" aria-label="Toggle dark mode" />
            <MoonStar :size="20" aria-hidden="true" />
          </div>
        </div>
      </div>
    </BaseContainer>
  </header>
</template>
