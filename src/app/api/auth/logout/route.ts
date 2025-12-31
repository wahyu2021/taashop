/**
 * @fileoverview Admin Logout API
 * 
 * Endpoint untuk logout admin.
 * Menghapus cookie admin_token.
 * 
 * @endpoint POST /api/auth/logout
 * @public (tidak memerlukan authentication)
 * @returns { success: boolean, message: string }
 */

import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logout berhasil' },
    { status: 200 }
  )

  // Hapus admin token cookie
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })

  return response
}

