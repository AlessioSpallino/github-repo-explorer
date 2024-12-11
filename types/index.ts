type RepoOwner = {
    avatar_url: string;
};

export interface Repo {
    id: number;
    name: string;
    owner: RepoOwner;
    html_url: string;
    description: string | null;
    stargazers_count?: number;
}

export type FetchReposParams = {
    user?: string;
    org?: string;
};

export type SearchType = 'user' | 'org';
