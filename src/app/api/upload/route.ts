import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { UPLOAD_CONFIG, UploadType } from '@/lib/upload-config';

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

        // Get the file system path
        const filePath = join(process.cwd(), 'public', publicPath);

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Write file to disk
        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            path: publicPath,
            fileName,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
