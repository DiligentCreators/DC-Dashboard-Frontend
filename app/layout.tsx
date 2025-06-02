import './globals.css'
import React from 'react'
import UserLoader from './providers/UserLoader'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <UserLoader /> {/* This runs on every route */}
    {children}
    </body>
    </html>
  )
}
