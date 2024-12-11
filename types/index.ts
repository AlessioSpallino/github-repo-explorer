import { RestEndpointMethodTypes } from '@octokit/rest'; // Importing types from Octokit

type RepoResponseOwnerItem = RestEndpointMethodTypes['search']['repos']['response']['data']['items'][number]['owner'];
export interface Repo {
    id: number;
    name: string;
    owner: RepoResponseOwnerItem;
    html_url: string;
    description: string | null;
    stargazers_count?: number;
}

export type FetchReposParams = {
    user?: string;
    org?: string;
};

export type SearchType = 'user' | 'org';
