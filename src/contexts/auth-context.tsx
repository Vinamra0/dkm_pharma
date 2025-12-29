"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        (async () => {
            try {
                const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
                if (token) {
                    const res = await fetch(`${API_BASE}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                        const json = await res.json();
                        const userData = { email: json.user.email, name: json.user.name };
                        setUser(userData);
                        localStorage.setItem('admin_user', JSON.stringify(userData));
                        setIsLoading(false);
                        return;
                    }
                }
            } catch (e) {
                // ignore
            }
            // fallback: clear any stored session
            if (typeof window !== 'undefined') {
                localStorage.removeItem('admin_user');
                localStorage.removeItem('admin_token');
            }
            setUser(null);
            setIsLoading(false);
        })();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) return false;
            const userData = { email: data.user.email, name: data.user.name };
            setUser(userData);
            if (typeof window !== 'undefined') {
                localStorage.setItem('admin_user', JSON.stringify(userData));
                if (data.token) localStorage.setItem('admin_token', data.token);
            }
            return true;
        } catch (e) {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('admin_user');
        router.push('/admin/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
