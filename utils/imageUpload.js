import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split(".");
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const limits = {
  fileSize: 1000000,
};

export const imageUpload = multer({ storage, limits });
