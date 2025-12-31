/**
 * @fileoverview Rate Limiting Utility
 * 
 * Menyediakan rate limiting berbasis namespace untuk mencegah abuse.
 * Menggunakan in-memory store (gunakan Redis untuk production multi-instance).
 * 
 * @example
 * // Menggunakan pre-configured limiter
 * import { loginLimiter } from '@/lib/rate-limit'
 * const { allowed, remaining } = loginLimiter.check(userIP)
 * 
 * @example  
 * // Membuat custom limiter
 * const apiLimiter = createRateLimiter('api', { maxAttempts: 100, windowMs: 60000 })
 */

type RateLimitRecord = { count: number; resetTime: number }

/** Konfigurasi untuk rate limiter */
interface RateLimitConfig {
  /** Maksimum attempt dalam window */
  maxAttempts: number
  /** Durasi window dalam milliseconds */
  windowMs: number
}

/** Hasil dari pengecekan rate limit */
interface RateLimitResult {
  /** True jika request diizinkan */
  allowed: boolean
  /** Sisa attempt yang tersedia */
  remaining: number
}

const stores = new Map<string, Map<string, RateLimitRecord>>()

/**
 * Membuat rate limiter dengan namespace terpisah
 * 
 * @param namespace - Nama unik untuk limiter (contoh: 'login', 'contact')
 * @param config - Konfigurasi limit
 * @returns Object dengan method check() dan reset()
 */
export function createRateLimiter(namespace: string, config: RateLimitConfig) {
  if (!stores.has(namespace)) {
    stores.set(namespace, new Map())
  }
  
  const store = stores.get(namespace)!
  
  return {
    /**
     * Cek apakah key (biasanya IP) masih dalam limit
     * @param key - Identifier unik (biasanya client IP)
     */
    check(key: string): RateLimitResult {
      const now = Date.now()
      const record = store.get(key)
      
      if (!record || now > record.resetTime) {
        store.set(key, { count: 1, resetTime: now + config.windowMs })
        return { allowed: true, remaining: config.maxAttempts - 1 }
      }
      
      if (record.count >= config.maxAttempts) {
        return { allowed: false, remaining: 0 }
      }
      
      record.count++
      return { allowed: true, remaining: config.maxAttempts - record.count }
    },
    
    /**
     * Reset limit untuk key tertentu
     * @param key - Identifier yang akan di-reset
     */
    reset(key: string): void {
      store.delete(key)
    }
  }
}

/** Rate limiter untuk login: 5 attempt per 15 menit */
export const loginLimiter = createRateLimiter('login', {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000
})

/** Rate limiter untuk contact form: 5 submission per 15 menit */
export const contactLimiter = createRateLimiter('contact', {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000
})

