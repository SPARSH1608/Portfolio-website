'use server'

import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function login(prevState: unknown, formData: FormData) {
    const password = formData.get('password') as string

    // Check against env variable
    if (password === process.env.ADMIN_PASSWORD) {
        await createSession('admin-user')
        redirect('/admin')
    }

    return {
        error: 'Invalid password'
    }
}

export async function logout() {
    await deleteSession()
}

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createProject(prevState: unknown, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    // Handle Image Upload
    const imageFile = formData.get('imageFile') as File | null;
    let imageUrl = formData.get('imageUrl') as string; // Fallback if they want URL

    if (imageFile && imageFile.size > 0) {
        const buffer = await imageFile.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        imageUrl = `data:${imageFile.type};base64,${base64}`;
    }

    const repoUrl = formData.get('repoUrl') as string
    const demoUrl = formData.get('demoUrl') as string
    const techStackStr = formData.get('techStack') as string
    const techStack = techStackStr.split(',').map(s => s.trim())
    const slug = `${title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${Date.now()}`

    try {
        await prisma.project.create({
            data: {
                title,
                description,
                imageUrl,
                repoUrl,
                demoUrl,
                techStack,
                slug,
                isFeatured: formData.get('isFeatured') === 'on'
            }
        })
        revalidatePath('/')
        revalidatePath('/admin')
        // Return simple JSON object to ensure serialization
        return { success: true, message: 'Project created' }
    } catch (e) {
        console.error('Create Project Error:', e);
        return { error: 'Failed to create project: ' + (e instanceof Error ? e.message : String(e)) }
    }
}

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({ where: { id } })
        revalidatePath('/')
        revalidatePath('/admin')
        // Return simple JSON object to ensure serialization
        return { success: true, message: 'Project deleted' }
    } catch (e) {
        return { error: 'Failed to delete project: ' + (e instanceof Error ? e.message : String(e)) }
    }
}

export async function updateProject(prevState: unknown, formData: FormData) {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const imageUrl = formData.get('imageUrl') as string
    const repoUrl = formData.get('repoUrl') as string
    const demoUrl = formData.get('demoUrl') as string
    const techStackStr = formData.get('techStack') as string
    const techStack = techStackStr.split(',').map(s => s.trim())

    try {
        await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                imageUrl,
                repoUrl,
                demoUrl,
                techStack,
                isFeatured: formData.get('isFeatured') === 'on'
            }
        })
        revalidatePath('/')
        revalidatePath('/admin')
        return { success: true, message: 'Project updated' }
    } catch (e) {
        console.error('Update Project Error:', e);
        return { error: 'Failed to update project' }
    }
}

export async function createSocialPost(prevState: unknown, formData: FormData) {
    const platform = formData.get('platform') as string
    const content = formData.get('content') as string
    const description = formData.get('description') as string
    const url = formData.get('url') as string

    try {
        await prisma.socialPost.create({
            data: {
                platform, // "twitter" or "medium"
                content,
                description,
                url,
                date: new Date(),
                isVisible: true
            }
        })
        revalidatePath('/')
        revalidatePath('/admin')
        return { success: true, message: 'Post created' }
    } catch (e) {
        console.error(e)
        return { error: 'Failed to create post' }
    }
}

export async function deleteSocialPost(id: string) {
    try {
        await prisma.socialPost.delete({ where: { id } })
        revalidatePath('/')
        revalidatePath('/admin')
    } catch (e) {
        console.error('Failed to delete post:', e)
    }
}

import { fetchCommits } from '@/lib/integrations/github'

export async function syncProjectCommits(projectId: string) {
    try {
        const project = await prisma.project.findUnique({ where: { id: projectId } })
        if (!project?.repoUrl) return { error: 'No Repo URL found' }

        const commits = await fetchCommits(project.repoUrl)
        if (commits.length === 0) return { error: 'No commits found' }

        // Clear old logs to avoid duplications for this MVP or use upsert
        // For simplicity and to ensure fresh data, let's wipe and replace (or strict upsert)
        // Wiping is safer for small scale.
        await prisma.commitLog.deleteMany({ where: { projectId } })

        await prisma.commitLog.createMany({
            data: commits.map(c => ({
                projectId,
                message: c.message,
                date: c.date,
            }))
        })

        revalidatePath('/')
        return { success: true, count: commits.length }
    } catch (e) {
        console.error(e)
        return { error: 'Sync Failed' }
    }
}

