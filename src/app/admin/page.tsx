import { verifySession } from '@/lib/session'
import { getProjects } from '@/app/actions'
import { logout, deleteProject, syncProjectCommits } from './actions'
import Link from 'next/link'
import { Plus, LogOut, RefreshCw } from 'lucide-react'
import { Project } from '@prisma/client'
import SocialPostForm from './SocialPostForm'
import SocialPostList from './SocialPostList'

export default async function AdminDashboard() {
    await verifySession()
    const projects = await getProjects(false)

    return (
        <div className="min-h-screen p-8 font-sans bg-neutral-50 dark:bg-neutral-950">
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex gap-4">
                    <Link href="/" className="px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
                        View Site
                    </Link>
                    <form action={logout}>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                            <LogOut size={16} /> Logout
                        </button>
                    </form>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Card */}
                <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <h3 className="text-neutral-500 text-sm font-medium">Total Projects</h3>
                    <p className="text-3xl font-bold mt-2">{projects.length}</p>
                </div>

                {/* Add New Project Card */}
                <Link href="/admin/projects/new" className="group p-6 flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors cursor-pointer">
                    <Plus className="w-8 h-8 text-neutral-400 group-hover:text-emerald-500 mb-2" />
                    <span className="text-neutral-500 font-medium group-hover:text-emerald-600">Add Project</span>
                </Link>
            </div>

            <h2 className="text-xl font-bold mt-12 mb-6">Manage Projects</h2>
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {projects.map((project: Project) => (
                            <tr key={project.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                                <td className="p-4 font-medium">{project.title}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${project.isFeatured ? 'bg-amber-100 text-amber-700' : 'bg-neutral-100 text-neutral-600'}`}>
                                        {project.isFeatured ? 'Featured' : 'Standard'}
                                    </span>
                                </td>
                                <td className="p-4 text-neutral-500 text-sm">{new Date(project.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <form action={async () => {
                                        'use server'
                                        await syncProjectCommits(project.id)
                                    }}>
                                        <button className="text-emerald-600 hover:text-emerald-800 text-sm font-medium" title="Sync Commits">
                                            <RefreshCw size={16} />
                                        </button>
                                    </form>
                                    <Link href={`/admin/projects/${project.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</Link>
                                    <form action={async () => {
                                        'use server'
                                        await deleteProject(project.id)
                                    }}>
                                        <button className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-neutral-500">No projects found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Social Feed Management */}
            <div className="mt-12 group">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Social Feed Management</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add New Post */}
                    <div className="lg:col-span-1 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 h-fit sticky top-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Plus size={16} /> Add Transmission
                        </h3>
                        <SocialPostForm />
                    </div>

                    {/* Recent Posts List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="font-bold text-neutral-500 text-sm uppercase tracking-wider mb-4">Active Transmissions</h3>
                        <SocialPostList />
                    </div>
                </div>
            </div>
        </div>
    )
}
