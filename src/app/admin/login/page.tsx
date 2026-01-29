'use client'

import { useActionState } from 'react'
import { login } from '../actions'

// Simple Minecraft-style Login
export default function LoginPage() {
    const [state, action, isPending] = useActionState(login, undefined)

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 font-sans">
            <div className="w-full max-w-md p-8 bg-white dark:bg-black border-4 border-neutral-800 dark:border-neutral-700 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)]">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>

                <form action={action} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full p-3 border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    {state?.error && (
                        <p className="text-red-500 text-sm font-bold">{state.error}</p>
                    )}

                    <button
                        disabled={isPending}
                        className="w-full p-3 bg-emerald-600 text-white font-bold uppercase tracking-wide hover:bg-emerald-500 disabled:opacity-50 minecraft-btn"
                    >
                        {isPending ? 'Logging in...' : 'Enter World'}
                    </button>
                </form>
            </div>
        </div>
    )
}
