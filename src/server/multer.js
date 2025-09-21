import multer from 'multer';

let upload; // Multer instance

// Initialize multer for file uploads
export const initMulter = () => {
    const storage = multer.memoryStorage();

    // Configure multer
    upload = multer({
        storage: storage,
        limits: {
            fileSize: 10 * 1024 * 1024 // 10MB limit
        }, fileFilter: (req, file, cb) => {
            // Accept only image files
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed'), false);
            }
        }
    });
};

// Get the multer upload middleware
export const getMulterUploadMiddleware = () => {
    // Initialize if not already done
    if (!upload) {
        initMulter();
    }

    // Single file upload with field name 'image'
    return upload.single('image');
};