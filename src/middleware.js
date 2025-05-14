import { NextResponse } from 'next/server'

// TODO
// Vérifier  la validité du token JWT
// Vérifier si le token est expiré ou non

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value
  const isLoginPage = request.nextUrl.pathname.startsWith('/login')

  if (!token && !isLoginPage) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (token && isLoginPage) {
    const dashboardUrl = new URL('/', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
}

export const config = { matcher: '/((?!.*\\.).*)' }
