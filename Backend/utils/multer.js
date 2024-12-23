import multer from "multer";
import path from "path";
import fs from "fs";

// Define storage settings for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = ".././FrontEnd/public/uploads"; // Directory to store files
        // Check if the uploads directory exists, if not create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir); // Save files in the uploads directory
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using the original name and current timestamp
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)); // Save with original file extension
    },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only .jpeg, .jpg, and .png files are allowed"), false);
    }
    cb(null, true); // Accept file
};

// Set up the multer upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
    fileFilter: fileFilter,
});

export default upload;