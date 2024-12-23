import multer from "multer";
import path from "path";
import fs from "fs";

// Define storage settings for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = ".././FrontEnd/public/uploads";
        try {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir);
        } catch (error) {
            console.error("Error creating upload directory:", error);
            cb(error, null);
        }
    },
    filename: (req, file, cb) => {
        try {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
        } catch (error) {
            console.error("Error generating filename:", error);
            cb(error, null);
        }
    },
});

// Updated file filter with better error handling
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    console.log("Uploaded file type:", file.mimetype);
    
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("FILE_TYPE_ERROR");
        console.log("File type not allowed:", file.mimetype);
        return cb(error, false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: fileFilter,
});

export default upload;