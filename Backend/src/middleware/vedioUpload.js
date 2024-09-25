import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder = "public/video-lectures";

    const ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif") {
      destinationFolder = "public/course-images";
    } else if (ext === ".pdf" || ext === ".doc" || ext === ".docx") {
      // Check for assessmentPdf and certificates
      if (file.fieldname === "assessmentPdf") {
        destinationFolder = "public/assessment-pdfs";
      } else if (file.fieldname === "certificate") {
        destinationFolder = "public/certificates";
      }
    }

    // Create destination folder if it doesn't exist
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }

    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});



const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // Check for allowed extensions for coverImage, certificate, assessmentPdf, and video
  if (
    (file.fieldname === "coverImage" &&
      (ext === ".jpg" ||
        ext === ".jpeg" ||
        ext === ".png" ||
        ext === ".gif")) ||
    (file.fieldname === "certificate" &&
      (ext === ".pdf" || ext === ".doc" || ext === ".docx")) ||
    (file.fieldname === "assessmentPdf" &&
      (ext === ".pdf" || ext === ".doc" || ext === ".docx")) ||
    (file.fieldname === "video" &&
      (ext === ".mp4" || ext === ".avi" || ext === ".mov"))
  ) {
  
    return cb(null, true);
  }

  return cb(
    new Error(
      "Invalid file format. Allowed formats: .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .mp4, .avi, .mov"
    )
  );
};

const fileUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: "coverImage", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
  { name: "assessmentPdf", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

export default fileUpload;
