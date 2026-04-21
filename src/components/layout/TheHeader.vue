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
  <header class="bg-violet-300 dark:bg-gray-800 transition-[bg-color] fixed top-0 z-100 w-full">
    <BaseContainer class="py-2">
      <div class="grid grid-cols-12 items-center gap-3">
        <div class="col-span-2 md:col-span-3">
          <RouterLink
            :to="{ name: 'home' }"
            class="flex md:p-2 hover:opacity-80 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="GitHub Explorer Home"
          >
            <TheLogoIcon class="w-full md:w-auto" />
          </RouterLink>
        </div>
        <div class="col-span-10 md:col-span-6">
          <SearchBar />
        </div>
        <div
          class="col-span-3 flex justify-end absolute md:static top-full right-0 p-2 md:p-0 md:z-40"
        >
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
