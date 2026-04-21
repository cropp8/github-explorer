import { ref } from 'vue';
import { defineStore } from 'pinia';
import { AxiosError } from 'axios';

import type { GitHubRepo, GitHubUser } from '@/types/github';
import { GitHubService } from '@/services/githubService';
import { useToast } from '@/composables/toast';

export const useGitHubStore = defineStore('github', () => {
  const user = ref<GitHubUser | null>(null);
  const repos = ref<GitHubRepo[]>([]);
  const userLoading = ref<boolean>(false);
  const reposLoading = ref<boolean>(false);
  const error = ref<string | null>(null); // do we need this?
  const searchHistory = ref<string[]>([]);

  const toast = useToast();

  function initHistory() {
    try {
      const saved = localStorage.getItem('searchHistory');

      if (saved) {
        searchHistory.value = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to parse search history from local storage', error);

      searchHistory.value = [];
    }
  }

  function addToHistory(username: string) {
    searchHistory.value.unshift(username);

    searchHistory.value = [...new Set(searchHistory.value)].slice(0, 5);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
  }

  async function fetchUser(username: string) {
    userLoading.value = true;
    user.value = null;
    repos.value = [];

    try {
      const userData = await GitHubService.getUser(username);

      user.value = userData;

      await fetchRepos(username, 1);

      addToHistory(username);
    } catch (err) {
      handleApiError(err, 'Failed to load user profile.');

      user.value = null;
      repos.value = [];
    } finally {
      userLoading.value = false;
      reposLoading.value = false;
    }
  }

  async function fetchRepos(username: string, page: number = 1) {
    reposLoading.value = true;

    try {
      repos.value = await GitHubService.getRepos(username, page);
    } catch (err) {
      handleApiError(err, 'Failed to load repositories.');

      repos.value = [];
    } finally {
      reposLoading.value = false;
    }
  }

  function handleApiError(err: unknown, defaultMsg: string) {
    if (err instanceof AxiosError) {
      if (!err.response) {
        toast.error('Network error. Check your connection.');
      } else if (err.response.status === 404) {
        toast.error('GitHub user not found.');
      } else if (err.response.status === 403) {
        toast.error('API rate limit exceeded.');
      } else {
        toast.error(err.response.data?.message || defaultMsg);
      }

      error.value = err.response?.data?.message || err.message; // do we need this?
    } else {
      toast.error(defaultMsg);
    }
  }

  return {
    user,
    repos,
    userLoading,
    reposLoading,
    error,
    searchHistory,
    initHistory,
    addToHistory,
    fetchUser,
    fetchRepos,
  };
});
