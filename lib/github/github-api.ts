import { octokit } from './octokit';
import { FetchReposParams, Repo } from '@/types';

export const fetchRepos = async ({
    user,
    org,
}: FetchReposParams): Promise<Repo[]> => {
    try {
        if (!user && !org) {
            throw new Error('Either "user" or "org" must be provided.');
        }

        // Build the query parameter
        const searchQuery = user 
            ? `user:${user} is:public`.trim() 
            : `org:${org} is:public`.trim();

        const response = await octokit.rest.search.repos({
            q: searchQuery,
        });

        return response.data.items
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};
