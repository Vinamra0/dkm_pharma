import { mkdir, readFile, writeFile, stat, unlink } from 'fs/promises'
import path from 'path'

const STORAGE_DIR = path.join(process.cwd(), 'storage', 'cvs')
const META_FILE = path.join(process.cwd(), 'storage', 'applications.json')

export type StoredApplication = {
    id: string
    name: string
    email: string
    phone?: string | null
    education?: string | null
    experience?: string | null
    location?: string | null
    coverLetter?: string | null
    jobId?: string | null
    cvOriginalName: string
    cvStoredName: string
    cvMimeType: string
    cvSize: number
    appliedAt: string
    ip?: string | null
}

async function ensureStorage() {
    await mkdir(STORAGE_DIR, { recursive: true })
    await mkdir(path.dirname(META_FILE), { recursive: true })
    try {
        await stat(META_FILE)
    } catch (e) {
        await writeFile(META_FILE, '[]', 'utf8')
    }
}

export async function loadApplications(): Promise<StoredApplication[]> {
    await ensureStorage()
    const txt = await readFile(META_FILE, 'utf8')
    try {
        return JSON.parse(txt) as StoredApplication[]
    } catch (e) {
        return []
    }
}

export async function saveApplications(items: StoredApplication[]) {
    await ensureStorage()
    await writeFile(META_FILE, JSON.stringify(items, null, 2), 'utf8')
}

export async function addApplication(item: StoredApplication) {
    const items = await loadApplications()
    items.unshift(item)
    await saveApplications(items)
}

export async function getApplicationById(id: string) {
    const items = await loadApplications()
    return items.find((i) => i.id === id)
}

export async function getApplicationByStoredName(name: string) {
    const items = await loadApplications()
    return items.find((i) => i.cvStoredName === name)
}

export async function deleteApplicationById(id: string) {
    const items = await loadApplications()
    const idx = items.findIndex((i) => i.id === id)
    if (idx === -1) return false
    const [removed] = items.splice(idx, 1)
    try {
        await unlink(path.join(STORAGE_DIR, removed.cvStoredName))
    } catch (e) {
        // ignore if file missing
    }
    await saveApplications(items)
    return true
}

export { STORAGE_DIR, META_FILE }
