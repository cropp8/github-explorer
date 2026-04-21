<script setup lang="ts">
import { FolderGit, Mail, Send } from '@lucide/vue';

import BaseContainer from '@/components/layout/BaseContainer.vue';
</script>

<template>
  <footer class="bg-gray-700 dark:bg-gray-800 text-white transition-[bg-color] group">
    <BaseContainer class="py-2 sm:py-6">
      <div class="grid grid-cols-12">
        <div class="col-span-6">
          <nav aria-label="Footer links">
            <a
              href="https://github.com/cropp8/github-explorer"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500 inline-flex gap-2 text-violet-300 hover:text-amber-500 text-sm"
            >
              <FolderGit :size="16" aria-hidden="true" class="shrink-0" />

              Source Code

              <span class="sr-only">(opens in a new tab)</span>
            </a>
          </nav>

          <div class="text-sm flex flex-col gap-1 text-gray-300 pt-3">
            <p class="font-medium">Contact me:</p>
            <ul>
              <li class="flex gap-2">
                <Mail :size="16" aria-hidden="true" class="shrink-0" />
                email:
                <a
                  href="mailto:s.samoilenko96@gmail.com"
                  class="font-semibold text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500 text-white hover:text-amber-500"
                >
                  s.samoilenko96@gmail.com
                </a>
              </li>
              <li class="flex gap-2">
                <Send :size="16" aria-hidden="true" class="shrink-0" />
                telegram:
                <a
                  href="https://t.me/cropp8"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500 text-white hover:text-amber-500"
                >
                  @cropp8
                  <span class="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-span-6 flex flex-col items-end justify-between">
          <p class="text-sm text-center cursor-default">
            Built with
            <span
              class="bg-emerald-500/40 group-hover:bg-emerald-500/60 px-1 rounded-sm inline-block font-semibold transition-colors duration-1000"
              >Vue 3</span
            >
            &
            <span
              class="bg-blue-500/40 group-hover:bg-blue-500/60 px-1 rounded-sm inline-block font-semibold transition-colors duration-1000"
              >TypeScript</span
            >
          </p>
          <p class="text-xs text-gray-300">Rate Limit: 60 requests/hr (Unauthenticated)</p>
        </div>
      </div>
    </BaseContainer>
  </footer>
</template>
