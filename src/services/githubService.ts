import apiClient from '@/api/apiClient';
import type { GitHubRepo, GitHubUser } from '@/types/github';

export const GitHubService = {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await apiClient.get(`users/${username}`);

    return response.data;
  },

  async getRepos(username: string): Promise<GitHubRepo[]> {
    const response = await apiClient.get(`users/${username}/repos`, {
      params: { sort: 'updated', per_page: 10 },
    });

    return response.data;
  },
};
