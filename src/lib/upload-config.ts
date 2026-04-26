// Configuration for image uploads
export const UPLOAD_CONFIG = {
    // Base directory for uploads (relative to public/)
    baseDir: '/assets',

    // Subdirectories for different types
    directories: {
        products: '/assets/products',
        blogs: '/assets/blogs',
        applications: '/assets/applications',
    },

    // Allowed image file types
    allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    allowedImageExtensions: ['.jpg', '.jpeg', '.png', '.webp'],

    // Allowed CV / document file types
    allowedCvTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    allowedCvExtensions: ['.pdf', '.doc', '.docx'],

    // Max file sizes
    maxImageFileSize: 20 * 1024 * 1024, // 20MB
    maxCvFileSize: 10 * 1024 * 1024, // 10MB

    // File naming - uses UUID for guaranteed uniqueness
    generateFileName: (originalName: string, _type: 'products' | 'blogs' | 'applications') => {
        void _type;
        // Generate a unique ID using crypto.randomUUID() for guaranteed uniqueness
        const uniqueId = crypto.randomUUID().split('-')[0]; // Use first segment (8 chars)
        const timestamp = Date.now();

        // Extract file extension
        const ext = originalName.split('.').pop()?.toLowerCase() || 'dat';

        // Sanitize the base name (without extension)
        const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
        const sanitized = baseName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 30); // Limit length

        // Format: {timestamp}-{uuid}-{sanitized-name}.{ext}
        return `${timestamp}-${uniqueId}-${sanitized}.${ext}`;
    },

    // Get full path for storage
    getStoragePath: (fileName: string, type: 'products' | 'blogs' | 'applications') => {
        return `${UPLOAD_CONFIG.directories[type]}/${fileName}`;
    },
} as const;

export type UploadType = keyof typeof UPLOAD_CONFIG.directories;
