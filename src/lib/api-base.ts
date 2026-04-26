// Centralized API base helper.
// Set NEXT_PUBLIC_API_BASE in your Vercel environment variables to your Render backend URL.
// e.g. https://your-app.onrender.com
//
// On the SERVER (Next.js server components / API routes), relative URLs like /backend don't
// work — fetch() needs an absolute URL. We fall back to BACKEND_PROXY_TARGET (server-only)
// or http://localhost:3001 for local dev.
//
// On the CLIENT (browser), /backend is fine — Next.js rewrites it to the backend.
const isServer = typeof window === 'undefined'
export const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE ||
  (isServer ? process.env.BACKEND_PROXY_TARGET : '') ||
  (isServer ? 'http://localhost:3001' : '/backend')
).replace(/\/$/, '')

// `CV_BASE` reuses `API_BASE` — CV files are stored on the same backend.
export const CV_BASE = API_BASE

function getUploadPathFromAny(input: string): string | null {
  const normalized = input.replace(/\\/g, '/').trim()
  const uploadIndex = normalized.indexOf('/uploads/')
  if (uploadIndex >= 0) {
    return normalized.slice(uploadIndex)
  }
  if (normalized.startsWith('uploads/')) {
    return `/${normalized}`
  }
  if (normalized.startsWith('/backend/uploads/')) {
    return normalized.replace('/backend/uploads/', '/uploads/')
  }
  if (normalized.startsWith('backend/uploads/')) {
    return `/${normalized}`.replace('/backend/uploads/', '/uploads/')
  }
  if (normalized.startsWith('/api/uploads/')) {
    return normalized.replace('/api/uploads/', '/uploads/')
  }
  if (normalized.startsWith('api/uploads/')) {
    return `/${normalized}`.replace('/api/uploads/', '/uploads/')
  }
  return null
}

export function normalizeUploadPath(path?: string | null): string {
  if (!path) return ''
  const trimmed = path.trim()
  if (!trimmed) return ''

  const uploadPath = getUploadPathFromAny(trimmed)
  if (uploadPath) return uploadPath

  try {
    const url = new URL(trimmed)
    const uploadPathFromUrl = getUploadPathFromAny(url.pathname)
    if (uploadPathFromUrl) return uploadPathFromUrl
  } catch {
    // Not a valid absolute URL; keep original value.
  }

  return trimmed
}

/**
 * Resolves an image path stored in the database to a fully displayable URL.
 *
 * Rules:
 *  - Empty/undefined → returns the fallback (default placeholder)
 *  - Already a full URL (http/https/data:) → returned as-is
 *  - Starts with /uploads/ or uploads/ → backend-hosted; prepend API_BASE
 *  - Anything else (e.g. /assets/…) → returned as-is (served from Next.js public/)
 */
export function resolveImageUrl(
  path?: string | null,
  fallback = '/assets/products/sample-paracetamol.svg'
): string {
  if (!path) return fallback
  const normalizedPath = normalizeUploadPath(path)
  if (!normalizedPath) return fallback

  if (normalizedPath.startsWith('data:')) return normalizedPath

  if (normalizedPath.startsWith('/uploads/')) {
    return `${API_BASE}${normalizedPath}`
  }

  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    try {
      const parsed = new URL(normalizedPath)
      const isLocalHost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1' || parsed.hostname === '0.0.0.0'
      const uploadPath = getUploadPathFromAny(parsed.pathname)
      if (isLocalHost && uploadPath) {
        return `${API_BASE}${uploadPath}`
      }
    } catch {
      // Keep original absolute URL when parsing fails unexpectedly.
    }
    return normalizedPath
  }

  return normalizedPath
}

export function downloadCvUrl(storedName?: string) {
  if (!storedName) return ''
  return `${CV_BASE}/api/admin/applications/cv/${encodeURIComponent(storedName)}`
}

export function adminListUrl() {
  return `${API_BASE}/api/admin/applications`
}
