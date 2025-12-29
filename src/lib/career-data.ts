export interface Career {
    id: string;
    title: string;
    location: string;
    type: string;
    department?: string;
    description?: string;
    postedAt?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export async function getPublicCareers(): Promise<Career[]> {
    try {
        const res = await fetch(`${API_BASE}/api/careers/public`);
        if (!res.ok) return [];
        const json = await res.json();
        const raw = (json.data || []) as any[];
        return raw.map(c => ({ ...(c || {}), id: String(c._id ?? c.id ?? ''), postedAt: String(c.postedAt || c.createdAt || '') }));
    } catch (e) {
        return [];
    }
}
