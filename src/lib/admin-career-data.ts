export interface AdminCareer {
    id: string;
    title: string;
    location: string;
    type: string;
    description: string;
    postedAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export async function getAllCareers(): Promise<AdminCareer[]> {
    try {
        const res = await fetch(`${API_BASE}/api/careers`, { headers: { Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('admin_token')}` : '' } });
        if (!res.ok) throw new Error('Failed');
        const json = await res.json();
        const raw = (json.data || []) as any[];
        return raw.map(c => ({ ...(c || {}), id: String(c.id ?? c._id ?? ''), postedAt: c.postedAt ? String(c.postedAt) : String(c.createdAt || '') }));
    } catch (e) {
        return [];
    }
}

export async function addCareer(career: Omit<AdminCareer, 'id' | 'postedAt'>): Promise<AdminCareer> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/careers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(career),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to add career');
    const c = json.career;
    return { ...(c || {}), id: String(c._id ?? c.id ?? ''), postedAt: String(c.postedAt || c.createdAt || '') };
}

export async function deleteCareer(id: string): Promise<boolean> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/careers/${id}`, { method: 'DELETE', headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
    return res.ok;
}

export async function updateCareer(id: string, updates: Partial<AdminCareer>): Promise<boolean> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/careers/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(updates) });
    return res.ok;
}

export async function getCareerById(id: string): Promise<AdminCareer | undefined> {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
        const res = await fetch(`${API_BASE}/api/careers/${id}`, { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
        if (!res.ok) return undefined;
        const json = await res.json();
        const c = json.data;
        if (!c) return undefined;
        return { ...(c || {}), id: String(c._id ?? c.id ?? ''), postedAt: String(c.postedAt || c.createdAt || '') } as AdminCareer;
    } catch (e) {
        return undefined;
    }
}
