'use client'

import { useActionState } from 'react'
import { createSocialPost } from './actions'
import { Twitter, BookOpen } from 'lucide-react'

export default function SocialPostForm() {
    const [state, action, isPending] = useActionState(createSocialPost, undefined)

    return (
        <form action={action} className="space-y-4">
            <div>
                <label className="block text-xs font-bold mb-1 uppercase text-neutral-500">Platform</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="platform" value="twitter" required defaultChecked className="accent-sky-500" />
                        <span className="text-sm flex items-center gap-1"><Twitter size={14} className="text-sky-500" /> Twitter</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="platform" value="medium" required className="accent-yellow-500" />
                        <span className="text-sm flex items-center gap-1"><BookOpen size={14} className="text-yellow-500" /> Medium</span>
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold mb-1 uppercase text-neutral-500">Content / Snippet (Optional)</label>
                <textarea name="content" rows={2} placeholder="Paste tweet text or article summary... (Optional)" className="w-full p-2 text-sm border rounded dark:bg-neutral-800 dark:border-neutral-700" />
            </div>

            <div>
                <label className="block text-xs font-bold mb-1 uppercase text-neutral-500">Short Description (Hover)</label>
                <textarea name="description" rows={2} placeholder="What is this about? (Shown on hover)" className="w-full p-2 text-sm border rounded dark:bg-neutral-800 dark:border-neutral-700" />
            </div>

            <div>
                <label className="block text-xs font-bold mb-1 uppercase text-neutral-500">Link URL</label>
                <input name="url" type="url" placeholder="https://..." className="w-full p-2 text-sm border rounded dark:bg-neutral-800 dark:border-neutral-700" required />
            </div>

            <button disabled={isPending} className="w-full py-2 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded hover:opacity-90 disabled:opacity-50 transition-opacity">
                {isPending ? 'Transmitting...' : 'Add to Feed'}
            </button>

            {state?.success && <p className="text-xs text-green-500 font-bold text-center">Signal sent successfully.</p>}
            {state?.error && <p className="text-xs text-red-500 font-bold text-center">{state.error}</p>}
        </form>
    )
}
