import { NextRequest, NextResponse } from 'next/server'

import { getAuthenticatedUser } from 'services/auth/getAuthenticatedUser'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const access_token = request.cookies.get('access_token')?.value

    if (!access_token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const tenant = pathname.split('/').filter(Boolean)[0]

    if (!tenant) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = NextResponse.next()

    response.cookies.set('tenant', tenant, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax'
    })

    try {
        await getAuthenticatedUser()
    } catch {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return response
}

export const config = {
    matcher: ['/:tenant((?!login|_next|api|static|public|favicon.ico|images|icons|sources).*)']
}
