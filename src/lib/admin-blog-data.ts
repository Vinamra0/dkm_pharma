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

// Local storage key
const STORAGE_KEY = 'admin_blogs';

// Initialize with some demo data
const initialBlogs: AdminBlogPost[] = [
    {
        id: "1",
        title: "Understanding Generic Medicines",
        excerpt: "Generic medicines are just as effective as brand-name medicines but cost significantly less.",
        content: "Generic medicines contain the same active ingredients as brand-name drugs and work in the same way. They are required to meet the same quality and safety standards. The main difference is the price - generics typically cost 30-80% less than their brand-name counterparts.",
        author: "Dr. Sharma",
        date: "2023-10-15",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
        category: "Education",
        slug: "understanding-generic-medicines",
    },
    {
        id: "2",
        title: "The Importance of Vaccination",
        excerpt: "Vaccines are crucial for preventing serious diseases.",
        content: "Vaccination is one of the most effective ways to prevent infectious diseases. Vaccines work by training your immune system to recognize and fight specific pathogens. Staying up-to-date with vaccinations protects not only you but also those around you through herd immunity.",
        author: "Nurse Rina",
        date: "2023-11-02",
        image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&q=80&w=800",
        category: "Health Awareness",
        slug: "importance-of-vaccination",
    },
    {
        id: "3",
        title: "Healthy Living Tips for Winter",
        excerpt: "Winter brings specific health challenges. Here are some tips to stay healthy.",
        content: "During winter, it's important to maintain a healthy lifestyle. Stay hydrated, eat nutritious foods rich in vitamins, exercise regularly even indoors, get adequate sleep, and wash your hands frequently to prevent the spread of seasonal illnesses.",
        author: "Wellness Team",
        date: "2023-12-01",
        image: "https://images.unsplash.com/photo-1516481265257-97e5f4bc50d5?auto=format&fit=crop&q=80&w=800",
        category: "Lifestyle",
        slug: "healthy-living-winter",
    },
];

// Get all blogs from localStorage
export function getAllBlogs(): AdminBlogPost[] {
    if (typeof window === 'undefined') return initialBlogs;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogs));
        return initialBlogs;
    }
    return JSON.parse(stored);
}

// Get single blog by ID
export function getBlogById(id: string): AdminBlogPost | undefined {
    const blogs = getAllBlogs();
    return blogs.find(blog => blog.id === id);
}

// Add new blog
export function addBlog(blog: Omit<AdminBlogPost, 'id'>): AdminBlogPost {
    const blogs = getAllBlogs();
    const newBlog: AdminBlogPost = {
        ...blog,
        id: Date.now().toString(),
    };
    blogs.unshift(newBlog);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return newBlog;
}

// Update existing blog
export function updateBlog(id: string, updates: Partial<AdminBlogPost>): boolean {
    const blogs = getAllBlogs();
    const index = blogs.findIndex(blog => blog.id === id);
    if (index === -1) return false;

    blogs[index] = { ...blogs[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return true;
}

// Delete blog
export function deleteBlog(id: string): boolean {
    const blogs = getAllBlogs();
    const filtered = blogs.filter(blog => blog.id !== id);
    if (filtered.length === blogs.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
}
