import { octokit } from '@/lib/octokit';
import { FetchReposParams, Repo } from '@/types';

const buildSearchQuery = (user: string | undefined, org: string | undefined): string => {
    if (user) {
        return `user:${user} is:public`.trim();
    } else if (org) {
        return `org:${org} is:public`.trim();
    }
    throw new Error('Either "user" or "org" must be provided.');
};

const handleApiError = (error: any) => {
    if (error.response && error.response.data && error.response.data.errors) {
        return error.response.data.errors.map((err: any) => err.message).join(', ');
    }
    return 'An unexpected error occurred.';
};

export const fetchRepos = async ({
    user,
    org,
}: FetchReposParams): Promise<Repo[]> => {
    try {
        const searchQuery = buildSearchQuery(user, org);
        console.log('Search Query:', searchQuery);

        const response = await octokit.rest.search.repos({ q: searchQuery });

        return response.data.items;
    } catch (error: any) {
        // Handle specific GitHub API errors
        const errorMessage = handleApiError(error);
        console.error('Error fetching repositories:', errorMessage);
        throw new Error(errorMessage);
    }
};
