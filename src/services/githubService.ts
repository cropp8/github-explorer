import apiClient from '@/api/apiClient';
import type { GitHubRepo, GitHubUser } from '@/types/github';
import { GH_API_ITEMS_PER_PAGE } from '@/constants';

export const GitHubService = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await apiClient.get(`users/${username}`);

    return response.data;
  },

  async getRepos(username: string, page: number = 1): Promise<GitHubRepo[]> {
    const response = await apiClient.get(`users/${username}/repos`, {
      params: { sort: 'updated', per_page: GH_API_ITEMS_PER_PAGE, page },
    });

    return response.data;
  },
};
