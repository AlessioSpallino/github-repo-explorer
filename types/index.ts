export interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count?: number;
}

// prev, next, last, first
export interface Links {
    [key: string]: string | undefined;
}

export type GitHubApiOutput = {
    repos: Repo[]; // Assuming Repo is already defined
    links: Links;   // Assuming Links is already defined
};

export type Sort = "stars" | "forks" | "updated" | "help-wanted-issues";
export type Direction = "asc" | "desc"
