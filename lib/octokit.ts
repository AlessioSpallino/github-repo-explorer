import { Octokit } from "@octokit/rest";

// Initialize Octokit with your GitHub token
export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});
