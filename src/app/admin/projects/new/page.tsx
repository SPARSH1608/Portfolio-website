'use client'
import { useActionState, useEffect } from 'react'
import { createProject } from '../../actions'
import { useRouter } from 'next/navigation'

export default function NewProjectPage() {
    const [state, action, isPending] = useActionState(createProject, undefined)
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
                <h1 className="text-2xl font-bold mb-6">Add New Project</h1>

                <form action={action} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Title</label>
                            <input name="title" required className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Tech Stack (comma separated)</label>
                            <input name="techStack" placeholder="React, Next.js, Prisma" className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2">Description</label>
                        <textarea name="description" rows={4} required className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Project Image (Upload)</label>
                            <input type="file" name="imageFile" accept="image/*" className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Repo URL</label>
                            <input name="repoUrl" className="w-full p-2 border rounded dark:bg-neutral-800 dark:border-neutral-700" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="isFeatured" id="isFeatured" className="w-4 h-4" />
                        <label htmlFor="isFeatured" className="text-sm font-bold">Feature on Homepage</label>
                    </div>

                    {state?.error && <p className="text-red-500 font-bold">{state.error}</p>}

                    <div className="flex justify-end gap-4">
                        <a href="/admin" className="px-4 py-2 text-neutral-500 hover:text-neutral-700">Cancel</a>
                        <button disabled={isPending} className="px-6 py-2 bg-[#052659] text-white font-bold rounded hover:bg-[#10B981] disabled:opacity-50">
                            {isPending ? 'Creating...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
