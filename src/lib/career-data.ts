export interface Career {
    id: string;
    title: string;
    location: string;
    type: string;
    department?: string;
    description?: string;
    postedAt?: string;
}

import { API_BASE } from '@/lib/api-base';

export async function getPublicCareers(): Promise<Career[]> {
    try {
        const res = await fetch(`${API_BASE}/api/careers/public`);
        if (!res.ok) return [];
        const json = await res.json();
        const raw = (json.data || []) as Array<Record<string, unknown>>;
        return raw.map((c) => ({
            ...(c || {}),
            id: String(c._id ?? c.id ?? ''),
            title: String(c.title ?? ''),
            location: String(c.location ?? ''),
            type: String(c.type ?? ''),
            department: c.department ? String(c.department) : undefined,
            description: c.description ? String(c.description) : undefined,
            postedAt: String(c.postedAt || c.createdAt || ''),
        })) as Career[];
    } catch {
        return [];
    }
}
