
import multer from "multer";
import path from "path";

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "CategoryImages");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];  
      cb(null, `${Date.now()}.${ext}`);
    },
  });

  const upload = multer({
    storage: multerStorage,
  }); 


  const multerStorages = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "BrandImages");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${Date.now()}.${ext}`);
    },
  });

  const upload_brand = multer({
    storage: multerStorages,
  });



 

export default {
    upload,
    upload_brand
}