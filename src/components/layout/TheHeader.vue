<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { useTheme } from '@/composables/theme';

import TheLogoIcon from '@/components/layout/TheLogoIcon.vue';
import ToggleSwitch from '@/components/ui/ToggleSwitch.vue';

const { isDarkTheme } = useTheme();
</script>

<template>
  <header class="bg-violet-300 dark:bg-gray-800">
    <div class="max-w-5xl mx-auto w-full px-4 sm:px-8 py-1 sm:py-2">
      <div class="grid grid-cols-12 items-center">
        <div class="col-span-3">
          <RouterLink
            :to="{ name: 'home' }"
            class="inline-flex p-2 hover:opacity-80 transition-opacity"
            aria-label="GitHub Explorer Home"
          >
            <TheLogoIcon />
          </RouterLink>
        </div>
        <div class="col-span-6">SearchBar here</div>
        <div class="col-span-3 flex justify-end">
          <ToggleSwitch v-model="isDarkTheme" />
          <!-- @TODO: add sun and moon icons -->
        </div>
      </div>
    </div>
  </header>
</template>
