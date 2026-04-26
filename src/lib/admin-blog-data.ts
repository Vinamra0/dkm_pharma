export interface AdminBlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    author: string
    date: string
    image: string
    category: string
    slug: string
}

import { API_BASE } from '@/lib/api-base';

// Get all blogs from backend only
export async function getAllBlogs(): Promise<AdminBlogPost[]> {
    try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        if (!res.ok) return [];
        const json = await res.json();
        const raw = (json.data || []) as Array<Record<string, unknown>>;
        const normalized = raw.map((b) => ({ ...(b || {}), id: String(b.id ?? b._id ?? '') }));
        return normalized as AdminBlogPost[];
    } catch {
        return [];
    }
}

// Get single blog by ID
export async function getBlogById(id: string): Promise<AdminBlogPost | undefined> {
    try {
        const res = await fetch(`${API_BASE}/api/blogs/${id}`);
        if (!res.ok) return undefined;
        const json = await res.json();
        const b = json.data as Record<string, unknown> | undefined;
        if (!b) return undefined;
        return { ...(b || {}), id: String(b.id ?? b._id ?? '') } as AdminBlogPost | undefined;
    } catch {
        const blogs = await getAllBlogs();
        return blogs.find(blog => blog.id === id);
    }
}

// Add new blog
export async function addBlog(blog: Omit<AdminBlogPost, 'id'>): Promise<AdminBlogPost> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(blog),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to add blog');
    return { ...(json.blog || {}), id: String(json.blog._id) } as AdminBlogPost;
}

// Update existing blog
export async function updateBlog(id: string, updates: Partial<AdminBlogPost>): Promise<boolean> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updates),
    });
    return res.ok;
}

// Delete blog
export async function deleteBlog(id: string): Promise<boolean> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return res.ok;
}
