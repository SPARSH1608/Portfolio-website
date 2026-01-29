import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

export async function middleware(request: NextRequest) {
    const protectedRoutes = ['/admin']
    const publicRoutes = ['/admin/login', '/']

    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route)) && !path.startsWith('/admin/login')

    const cookie = request.cookies.get('session')?.value
    const session = await decrypt(cookie)

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/admin/login', request.nextUrl))
    }

    if (path === '/admin/login' && session?.userId) {
        return NextResponse.redirect(new URL('/admin', request.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
