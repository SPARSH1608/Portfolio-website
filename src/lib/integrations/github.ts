import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: 'minecraft-portfolio/1.0.0'
});

export async function fetchCommits(repoUrl: string) {
    try {
        // Extract owner/repo from URL
        // Format: https://github.com/owner/repo
        const urlParts = repoUrl.split('/').filter(Boolean);
        const repo = urlParts[urlParts.length - 1];
        const owner = urlParts[urlParts.length - 2];

        if (!owner || !repo) throw new Error("Invalid GitHub URL");

        // Fetch last 100 commits or recent
        const { data } = await octokit.repos.listCommits({
            owner,
            repo,
            per_page: 50,
        });

        return data.map(commit => ({
            message: commit.commit.message,
            date: new Date(commit.commit.author?.date || new Date()),
            sha: commit.sha
        }));
    } catch (error) {
        console.error("Error fetching commits:", error);
        return [];
    }
}
