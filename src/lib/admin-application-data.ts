// Keep application list/fetches pointed to the app's API (Next.js) so only CVs are fetched from the backend.
export interface AdminApplication {
  id: string
  name?: string
  email?: string
  phone?: string
  position?: string
  coverLetter?: string
  storedName?: string
  originalName?: string
  downloadUrl?: string
  createdAt?: string
}

import { extractCvStoredName, resolveCvDownloadUrl } from '@/lib/api-base'

const APP_API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

export async function getAllApplications(): Promise<AdminApplication[]> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    const res = await fetch(`${APP_API_BASE.replace(/\/$/, '')}/api/admin/applications`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (!res.ok) return []
    const json = await res.json()
    const raw = (json.data || json.applications || json.items || []) as Array<Record<string, unknown>>
    return raw.map((a) => {
      const id = String(a._id ?? a.id ?? '')

      // possible stored filename keys from various backends
      const storedName =
        a.cvStoredName ??
        a.storedName ??
        a.stored_name ??
        a.stored_file_name ??
        a.fileName ??
        a.file_name ??
        a.filename ??
        a.file ??
        a.cv ??
        a.cvFile ??
        a.cv_file ??
        a.cvFileName ??
        a.cv_file_name ??
        a.resumeFile ??
        a.resume_file ??
        a.resumeFileName ??
        a.resume_file_name ??
        a.resume ??
        ''

      // possible original/or display filename keys
      const originalName =
        a.cvOriginalName ??
        a.originalName ??
        a.original_name ??
        a.original_file_name ??
        a.fileName ??
        a.filename ??
        a.cvFileName ??
        a.cv_file_name ??
        a.resumeFileName ??
        a.resume_file_name ??
        a.resumeOriginalName ??
        a.resume_name ??
        ''

      // If backend already provides a direct URL to download, prefer it
      const rawDownloadUrl =
        a.downloadUrl ??
        a.resumeUrl ??
        a.fileUrl ??
        a.cvUrl ??
        a.cvPath ??
        a.cv_path ??
        a.path ??
        a.filePath ??
        a.file_path ??
        a.resumePath ??
        a.resume_path ??
        a.url ??
        ''
      const normalizedStoredName = extractCvStoredName(String(storedName || rawDownloadUrl || ''))
      const downloadUrl = resolveCvDownloadUrl(String(rawDownloadUrl || ''))

      return ({
        ...(a || {}),
        id,
        storedName: normalizedStoredName,
        originalName,
        createdAt: String(a.appliedAt ?? a.createdAt ?? a.created_at ?? ''),
        downloadUrl,
      }) as AdminApplication
    }) as AdminApplication[]
  } catch {
    return []
  }
}

export async function getApplicationById(id: string): Promise<AdminApplication | undefined> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
    const res = await fetch(`${APP_API_BASE.replace(/\/$/, '')}/api/admin/applications/${encodeURIComponent(id)}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (!res.ok) return undefined
    const json = await res.json()
    const a = json.data || json.application || json.item || json
    if (!a) return undefined
    const normalizedId = String(a._id ?? a.id ?? '')
    const storedName =
      a.cvStoredName ??
      a.storedName ??
      a.stored_name ??
      a.stored_file_name ??
      a.fileName ??
      a.file_name ??
      a.filename ??
      a.file ??
      a.cv ??
      a.cvFile ??
      a.cv_file ??
      a.cvFileName ??
      a.cv_file_name ??
      a.resumeFile ??
      a.resume_file ??
      a.resumeFileName ??
      a.resume_file_name ??
      a.resume ??
      ''

    const originalName =
      a.cvOriginalName ??
      a.originalName ??
      a.original_name ??
      a.original_file_name ??
      a.fileName ??
      a.filename ??
      a.cvFileName ??
      a.cv_file_name ??
      a.resumeFileName ??
      a.resume_file_name ??
      a.resumeOriginalName ??
      a.resume_name ??
      ''

    const rawDownloadUrl =
      a.downloadUrl ??
      a.resumeUrl ??
      a.fileUrl ??
      a.cvUrl ??
      a.cvPath ??
      a.cv_path ??
      a.path ??
      a.filePath ??
      a.file_path ??
      a.resumePath ??
      a.resume_path ??
      a.url ??
      ''
    const normalizedStoredName = extractCvStoredName(String(storedName || rawDownloadUrl || ''))
    const downloadUrl = resolveCvDownloadUrl(String(rawDownloadUrl || ''))

    return {
      ...(a || {}),
      id: normalizedId,
      storedName: normalizedStoredName,
      originalName,
      createdAt: String(a.appliedAt ?? a.createdAt ?? a.created_at ?? ''),
      downloadUrl,
    } as AdminApplication
  } catch {
    return undefined
  }
}

export async function deleteApplication(id: string): Promise<boolean> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  const res = await fetch(`${APP_API_BASE.replace(/\/$/, '')}/api/admin/applications/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  return res.ok
}
