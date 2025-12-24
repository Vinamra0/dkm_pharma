"use client";

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { UPLOAD_CONFIG, UploadType } from '@/lib/upload-config';
import { Button } from './button';

interface ImageUploadProps {
    label?: string;
    value?: string;
    onChange: (path: string) => void;
    type: UploadType;
    error?: string;
    required?: boolean;
}

export function ImageUpload({
    label = 'Image',
    value,
    onChange,
    type,
    error,
    required,
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (file: File) => {
        // Validate file type
        if (!UPLOAD_CONFIG.allowedTypes.includes(file.type as any)) {
            alert('Invalid file type. Only JPG, PNG, and WebP images are allowed.');
            return;
        }

        // Validate file size
        if (file.size > UPLOAD_CONFIG.maxFileSize) {
            alert(`File size exceeds ${UPLOAD_CONFIG.maxFileSize / 1024 / 1024}MB limit`);
            return;
        }

        setIsUploading(true);

        try {
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Upload file
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            // Update parent with the path
            onChange(data.path);
        } catch (error) {
            console.error('Upload error:', error);
            alert(error instanceof Error ? error.message : 'Failed to upload image');
            setPreview(null);
        } finally {
            setIsUploading(false);
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
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-lg"
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
                            accept={UPLOAD_CONFIG.allowedExtensions.join(',')}
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
                                        JPG, PNG or WebP (max {UPLOAD_CONFIG.maxFileSize / 1024 / 1024}MB)
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
