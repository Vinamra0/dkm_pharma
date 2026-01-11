// Centralized API base helper. Set `NEXT_PUBLIC_API_BASE` in Next.js for client access.
// `GO_PUBLIC_API_BASE` is accepted as an alternative environment variable name.
// New env var `NEXT_PUBLIC_BACKEND_BASE` is the preferred name for client-visible backend base URL.
// Fallback order: NEXT_PUBLIC_BACKEND_BASE -> NEXT_PUBLIC_API_BASE -> GO_PUBLIC_API_BASE -> localhost dev URL
// `API_BASE` remains the app's API base (used by most frontend calls). Keep this simple
// so the app can continue calling its own Next.js routes when `NEXT_PUBLIC_API_BASE` is set.
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

// `CV_BASE` is a dedicated base URL for CV download/storage. Set `NEXT_PUBLIC_CV_BACKEND_BASE`
// to point to your backend that stores CV files (e.g., http://localhost:3001).
export const CV_BASE =
  process.env.NEXT_PUBLIC_CV_BACKEND_BASE ||
  process.env.NEXT_PUBLIC_BACKEND_BASE ||
  // Derive a sensible default in dev from the current origin with port 3001.
  (typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:3001`
    : '')

export function downloadCvUrl(storedName?: string) {
  if (!storedName) return ''
  return `${CV_BASE.replace(/\/$/, '')}/api/admin/applications/cv/${encodeURIComponent(storedName)}`
}

export function adminListUrl() {
  return `${API_BASE.replace(/\/$/, '')}/api/admin/applications`
}
