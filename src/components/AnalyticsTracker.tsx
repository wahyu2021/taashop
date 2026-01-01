'use client'

import { useEffect, useRef, useCallback } from 'react'
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

// Track last tracked path to prevent duplicates
function getLastTrackedPath(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('analytics_last_path')
}

function setLastTrackedPath(path: string): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('analytics_last_path', path)
}

export function AnalyticsTracker() {
  const pathname = usePathname()
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isTrackingRef = useRef(false)

  const trackPageView = useCallback((path: string) => {
    // Prevent duplicate tracking
    if (isTrackingRef.current) return
    
    // Skip if same path was just tracked
    const lastPath = getLastTrackedPath()
    if (lastPath === path) return
    
    isTrackingRef.current = true
    setLastTrackedPath(path)

    const payload = JSON.stringify({
      path,
      referrer: document.referrer || null,
      sessionId: getSessionId(),
    })

    // Use Beacon API for non-blocking, reliable delivery
    // Falls back to fetch if Beacon is not available
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics/track', blob)
    } else {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true, // Ensure request completes even if page unloads
      }).catch(() => {
        // Silently fail - don't disrupt user experience
      })
    }

    isTrackingRef.current = false
  }, [])

  useEffect(() => {
    // Don't track admin pages or studio
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/studio')) return
    
    // Don't track if page is not visible (bot/prefetch)
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return

    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Debounce: wait 2 seconds before tracking to prevent rapid-fire navigations
    debounceTimerRef.current = setTimeout(() => {
      if (pathname) {
        trackPageView(pathname)
      }
    }, 2000)

    // Cleanup on unmount or path change
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [pathname, trackPageView])

  return null
}
