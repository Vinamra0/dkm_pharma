import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { UPLOAD_CONFIG, UploadType } from '@/lib/upload-config';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const type = formData.get('type') as UploadType;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        if (!type || !UPLOAD_CONFIG.directories[type]) {
            return NextResponse.json(
                { error: 'Invalid upload type' },
                { status: 400 }
            );
        }

        // Validate file type
        if (!UPLOAD_CONFIG.allowedImageTypes.includes(file.type as (typeof UPLOAD_CONFIG.allowedImageTypes)[number])) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPG, PNG, and WebP images are allowed.' },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > UPLOAD_CONFIG.maxImageFileSize) {
            return NextResponse.json(
                { error: `File size exceeds ${UPLOAD_CONFIG.maxImageFileSize / 1024 / 1024}MB limit` },
                { status: 400 }
            );
        }

        // Generate filename
        const fileName = UPLOAD_CONFIG.generateFileName(file.name, type);

        // Get the public path
        const publicPath = UPLOAD_CONFIG.getStoragePath(fileName, type);

        // Normalize path to keep writes inside the public folder.
        const relativePublicPath = publicPath.replace(/^\/+/, '');
        const filePath = join(process.cwd(), 'public', relativePublicPath);

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure destination directory exists before writing file.
        await mkdir(dirname(filePath), { recursive: true });

        // Write file to disk
        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            path: publicPath,
            fileName,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to upload file';
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: message || 'Failed to upload file' },
            { status: 500 }
        );
    }
}
