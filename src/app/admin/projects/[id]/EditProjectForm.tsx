'use client'

import { useActionState, useEffect } from 'react'
import { updateProject } from '../../actions'
import { useRouter } from 'next/navigation'
import { Project } from '@prisma/client'

// Since this is a client component, we'll pass the initial project data as props
// The parent server component will fetch it.
export default function EditProjectForm({ project }: { project: Project }) {
    const [state, action, isPending] = useActionState(updateProject, undefined)
    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            router.push('/admin')
            router.refresh()
        }
    }, [state, router])

    return (
        <div className="min-h-screen p-8 bg-neutral-50 dark:bg-black font-sans flex justify-center">
            <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8">
                <h1 className="text-2xl font-bold mb-6">Edit Project: {project.title}</h1>

                <form action={action} className="space-y-6">
                    <input type="hidden" name="id" value={project.id} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Title</label>
                            <input name="title" defaultValue={project.title} required className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Tech Stack (comma separated)</label>
                            <input name="techStack" defaultValue={project.techStack.join(', ')} placeholder="React, Next.js, Prisma" className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Description</label>
                        <textarea name="description" defaultValue={project.description} rows={4} required className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Image URL</label>
                            <input name="imageUrl" defaultValue={project.imageUrl || ''} className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Repo URL</label>
                            <input name="repoUrl" defaultValue={project.repoUrl || ''} className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Demo URL</label>
                            <input name="demoUrl" defaultValue={project.demoUrl || ''} className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="isFeatured" id="isFeatured" defaultChecked={project.isFeatured} className="w-4 h-4" />
                        <label htmlFor="isFeatured" className="text-sm font-bold">Feature on Homepage</label>
                    </div>

                    {state?.error && <p className="text-red-500 font-bold">{state.error}</p>}

                    <div className="flex justify-end gap-4">
                        <a href="/admin" className="px-4 py-2 text-neutral-500 hover:text-neutral-700">Cancel</a>
                        <button disabled={isPending} className="px-6 py-2 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-500 disabled:opacity-50">
                            {isPending ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
