import { octokit } from './octokit';
import { Sort, Direction, Links, GitHubApiOutput } from '@/types';

type FetchReposParams = {
    user?: string;
    org?: string;
    page?: number;
    perPage?: number;
    sort?: Sort;
    direction?: Direction;
    q?: string;
};

export const fetchRepos = async ({
    user,
    org,
    page = 1,
    perPage = 10,
    sort,
    direction = 'asc',
    q,
}: FetchReposParams): Promise<GitHubApiOutput> => {
    console.log(user, org, q);
    try {
        if (!user && !org) {
            throw new Error('Either "user" or "org" must be provided.');
        }

        // Build the query parameter
        const searchQuery = user 
            ? `user:${user} is:public ${q || ''}`.trim() 
            : `org:${org} is:public ${q || ''}`.trim();

        const response = await octokit.rest.search.repos({
            q: searchQuery,
            page,
            per_page: perPage,
            sort,
            order: direction,
        });

        // Extract pagination links
        const links = extractLinks(response.headers?.link || '');
        return { repos: response.data.items, links }; // `items` contains the list of repositories
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};

// Function to extract pagination links from the response headers
const extractLinks = (linkHeader: string) => {
    if (!linkHeader) return {};
    const links: Links = {};
    const parts = linkHeader.split(',');
    parts.forEach(part => {
        const section = part.split(';');
        const url = section[0].replace(/<|>/g, '').trim();
        const name = section[1].replace(/rel=|"/g, '').trim();
        links[name] = url;
    });
    return links;
};
