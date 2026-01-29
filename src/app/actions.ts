'use server'

import prisma from '@/lib/prisma'

export async function getProjects(featuredOnly = true) {
    try {
        const where = featuredOnly ? { isFeatured: true } : {}
        const projects = await prisma.project.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                commitLogs: {
                    orderBy: { date: 'desc' },
                    take: 5
                }
            }
        })
        return projects
    } catch (error) {
        console.error('Error fetching projects:', error)
        return []
    }
}

export async function getSocialPosts() {
    try {
        const posts = await prisma.socialPost.findMany({
            where: { isVisible: true },
            orderBy: { date: 'desc' }
        })
        return posts
    } catch (error) {
        console.error('Error fetching social posts:', error)
        return []
    }
}

export async function getStats() {
    try {
        const projectCount = await prisma.project.count();
        const commitCount = await prisma.commitLog.count();
        return { projectCount, commitCount };
    } catch {
        return { projectCount: 0, commitCount: 0 }
    }
}

export async function getProject(id: string) {
    try {
        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                commitLogs: {
                    orderBy: { date: 'desc' },
                    take: 5
                }
            }
        })
        return project
    } catch (error) {
        console.error('Error fetching project:', error)
        return null
    }
}

export async function getGithubStats() {
    const username = process.env.GITHUB_USERNAME || 'vercel';
    try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 0 } }),
            fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, { next: { revalidate: 0 } }),
            fetch(`https://api.github.com/users/${username}/events?per_page=30`, { next: { revalidate: 0 } })
        ]);

        if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
            console.error('GitHub API Error:', {
                user: userRes.status,
                repos: reposRes.status,
                events: eventsRes.status
            });
            throw new Error('One or more GitHub requests failed');
        }

        const user = await userRes.json();
        const repos = await reposRes.json();
        const events = await eventsRes.json();

        const commits = Array.isArray(events) ? events
            .filter((e: any) => e.type === 'PushEvent')
            .flatMap((e: any) => {
                if (Array.isArray(e.payload?.commits) && e.payload.commits.length > 0) {
                    return e.payload.commits.map((c: any) => ({
                        message: c.message,
                        date: e.created_at,
                        repo: e.repo.name
                    }));
                }

                const count = e.payload?.size || 1;
                return Array.from({ length: Math.min(count, 5) }).map((_, i) => ({
                    message: i === 0 ? `Pushed to ${e.repo.name}` : 'Commit details hidden',
                    date: e.created_at,
                    repo: e.repo.name
                }));
            })
            .slice(0, 5) : [];

        return {
            user,
            repos: Array.isArray(repos) ? repos : [],
            commits: commits
        };
    } catch (error) {
        console.error('GitHub fetch error (using username:', username, '):', error);
        return { user: null, repos: [], commits: [] };
    }
}

export async function getVisitorCount() {
    try {
        // Find the first record, if not exists, create one
        let stats = await prisma.siteStats.findFirst();
        if (!stats) {
            stats = await prisma.siteStats.create({
                data: { visitors: 0 }
            });
        }
        return stats.visitors;
    } catch (error) {
        console.error('Error getting visitor count:', error);
        return 0;
    }
}

export async function incrementVisitorCount() {
    try {
        let stats = await prisma.siteStats.findFirst();
        if (!stats) {
            stats = await prisma.siteStats.create({
                data: { visitors: 1 }
            });
        } else {
            stats = await prisma.siteStats.update({
                where: { id: stats.id },
                data: { visitors: { increment: 1 } }
            });
        }
        return stats.visitors;
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        return 0;
    }
}
