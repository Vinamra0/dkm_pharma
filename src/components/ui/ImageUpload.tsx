"use client";

import { useState, useRef, ChangeEvent, DragEvent, useEffect } from 'react';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { UPLOAD_CONFIG, UploadType } from '@/lib/upload-config';
import { resolveImageUrl } from '@/lib/api-base';
import { Button } from './button';

interface ImageUploadProps {
    label?: string;
    value?: string;
    onChange: (path: string) => void;
    type: UploadType;
    error?: string;
    required?: boolean;
    onUploadingChange?: (isUploading: boolean) => void;
}

export function ImageUpload({
    label = 'Image',
    value,
    onChange,
    type,
    error,
    required,
    onUploadingChange,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    // preview holds a local data-URL (fresh upload) or a resolved backend URL (edit mode)
    const [preview, setPreview] = useState<string | null>(value ? resolveImageUrl(value) : null);
    // When true, preview is a local data-URL from a fresh upload; don't let useEffect override it
    const isLocalPreview = useRef(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync preview when parent changes `value` externally (e.g. edit form loads existing data)
    // but skip if we just set a local data-URL ourselves
    useEffect(() => {
        if (isLocalPreview.current) return;
        setPreview(value ? resolveImageUrl(value) : null);
    }, [value]);

    const handleFileSelect = async (file: File) => {
        // Validate file type
        if (!UPLOAD_CONFIG.allowedImageTypes.includes(file.type as (typeof UPLOAD_CONFIG.allowedImageTypes)[number])) {
            alert('Invalid file type. Only JPG, PNG, and WebP images are allowed.');
            return;
        }

        // Validate file size
        if (file.size > UPLOAD_CONFIG.maxImageFileSize) {
            alert(`File size exceeds ${UPLOAD_CONFIG.maxImageFileSize / 1024 / 1024}MB limit`);
            return;
        }

        setIsUploading(true);
        onUploadingChange?.(true);

        try {
            // Show a local data-URL preview immediately for instant feedback
            const reader = new FileReader();
            reader.onload = (e) => {
                isLocalPreview.current = true;
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Always POST to /api/upload (same-origin Next.js proxy route).
            // This avoids browser CORS issues — the proxy forwards server-side to the backend.
            const uploadUrl = '/api/upload';

            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            type UploadResponse = {
                error?: string;
                message?: string;
                path?: string;
                url?: string;
                location?: string;
                fileName?: string;
                data?: { path?: string; url?: string; location?: string; fileName?: string };
            };

            let data: UploadResponse = {};
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                data = await response.json().catch(() => ({}));
            }

            const returnedPath =
                data?.path ||
                data?.url ||
                data?.location ||
                data?.data?.path ||
                data?.data?.url ||
                data?.data?.location ||
                (data?.fileName ? `/uploads/${data.fileName}` : '') ||
                (data?.data?.fileName ? `/uploads/${data.data.fileName}` : '');

            if (!response.ok || !returnedPath) {
                const message = data?.message || data?.error || `Upload failed (${response.status})`;
                throw new Error(message);
            }

            // Store the raw path (/uploads/file.jpg). isLocalPreview stays true so the
            // data-URL preview is kept — no flicker or blank state after upload.
            onChange(returnedPath);
        } catch (err) {
            console.error('Upload error:', err);
            alert(err instanceof Error ? err.message : 'Failed to upload image');
            // Revert to the previously saved value (or empty) on failure
            isLocalPreview.current = false;
            setPreview(value ? resolveImageUrl(value) : null);
        } finally {
            setIsUploading(false);
            onUploadingChange?.(false);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleRemove = () => {
        isLocalPreview.current = false;
        setPreview(null);
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-slate-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          relative border-2 border-dashed rounded-lg transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}
          ${error ? 'border-red-300' : ''}
        `}
            >
                {preview ? (
                    <div className="relative h-64">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 gap-1"
                        >
                            <X className="w-4 h-4" />
                            Remove
                        </Button>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={UPLOAD_CONFIG.allowedImageExtensions.join(',')}
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={isUploading}
                        />

                        {isUploading ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                                <p className="text-sm text-slate-600">Uploading...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-700 mb-1">
                                        Drop image here or{' '}
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-blue-600 hover:text-blue-700 underline"
                                        >
                                            browse
                                        </button>
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        JPG, PNG or WebP (max {UPLOAD_CONFIG.maxImageFileSize / 1024 / 1024}MB)
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
