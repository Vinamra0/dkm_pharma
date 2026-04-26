// Centralized API base helper.
// Set NEXT_PUBLIC_API_BASE in your Vercel environment variables to your Render backend URL.
// e.g. https://your-app.onrender.com
// In local development this falls back to http://localhost:3001.
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001').replace(/\/$/, '')

// `CV_BASE` reuses `API_BASE` — CV files are stored on the same backend.
export const CV_BASE = API_BASE

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
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path
  if (path.startsWith('/uploads/') || path.startsWith('uploads/')) {
    const normalised = path.startsWith('/') ? path : `/${path}`
    return `${API_BASE}${normalised}`
  }
  return path
}

export function downloadCvUrl(storedName?: string) {
  if (!storedName) return ''
  return `${CV_BASE}/api/admin/applications/cv/${encodeURIComponent(storedName)}`
}

export function adminListUrl() {
  return `${API_BASE}/api/admin/applications`
}
