import { defineStore } from 'pinia';
import { AxiosError } from 'axios';

import type { GitHubRepo, GitHubUser } from '@/types/github';
import { GitHubService } from '@/services/githubService';

export const useGitHubStore = defineStore('github', {
  state: () => ({
    user: null as GitHubUser | null,
    repos: [] as GitHubRepo[],
    loading: false,
    error: null as string | null,
    searchHistory: [] as string[],
  }),

  actions: {
    initHistory() {
      try {
        const saved = localStorage.getItem('searchHistory');

        if (saved) {
          this.searchHistory = JSON.parse(saved);
        }
      } catch (error) {
        console.error('Failed to parse search history from local storage', error);

        this.searchHistory = [];
      }
    },

    addToHistory(username: string) {
      this.searchHistory.unshift(username);

      this.searchHistory = [...new Set(this.searchHistory)].slice(0, 5);

      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    },

    async fetchUser(username: string) {
      this.loading = true;
      this.error = null;
      this.user = null;
      this.repos = [];

      try {
        const [userData, reposData] = await Promise.all([
          GitHubService.getUser(username),
          GitHubService.getRepos(username),
        ]);

        this.user = userData;
        this.repos = reposData;

        this.addToHistory(username);
      } catch (err) {
        if (err instanceof AxiosError) {
          this.error = err.response?.data?.message || 'User not found';
        } else if (err instanceof Error) {
          this.error = err.message;
        } else {
          this.error = 'An unexpected error occurred';
        }

        this.user = null;
        this.repos = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
