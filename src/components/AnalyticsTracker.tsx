'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Generate a session ID that persists for the browser session
function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't track admin pages
    if (pathname?.startsWith('/admin')) return
    
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || null,
            sessionId: getSessionId(),
          }),
        })
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.debug('Analytics tracking failed:', error)
      }
    }

    trackPageView()
  }, [pathname])

  return null
}
