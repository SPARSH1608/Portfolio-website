'use server'

import { getSocialPosts } from '@/app/actions'
import { deleteSocialPost } from './actions'
import { Twitter, BookOpen, Trash2, ExternalLink } from 'lucide-react'

export default async function SocialPostList() {
    const posts = await getSocialPosts()

    if (posts.length === 0) {
        return (
            <div className="p-8 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-400 text-sm">
                No active signals found.
            </div>
        )
    }

    return (
        <div className="grid gap-3">
            {posts.map((post: any) => (
                <div key={post.id} className="p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-start justify-between group">
                    <div className="flex gap-4">
                        <div className={`p-2 rounded-lg h-fit ${post.platform === 'twitter' ? 'bg-sky-500/10 text-sky-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {post.platform === 'twitter' ? <Twitter size={16} /> : <BookOpen size={16} />}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2 pr-4 font-medium">
                                {post.content}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-neutral-400">
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                <a href={post.url} target="_blank" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                                    <ExternalLink size={10} /> Link
                                </a>
                            </div>
                        </div>
                    </div>

                    <form action={deleteSocialPost.bind(null, post.id)}>
                        <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" title="Delete Signal">
                            <Trash2 size={16} />
                        </button>
                    </form>
                </div>
            ))}
        </div>
    )
}
