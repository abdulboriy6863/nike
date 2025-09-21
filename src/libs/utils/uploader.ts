import path from "path";
import multer from "multer";
import { v4 } from "uuid";

/* MULTER IMAGE UPLOADER */
function getTargetImageStore(adress: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${adress}`);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension;
      cb(null, random_name);
    },
  });
}

const makeUploader = (adress: string) => {
  const storage = getTargetImageStore(adress);
  return multer({ storage: storage });
};

export default makeUploader;

// const product_storage = multer.diskStorage({
//   //multer uploadesning products degan folderiga yuklaydi
//   destination: function (req, file, cd) {
//     cd(null, "./uploades/products");
//   },
//   filename: function (req, file, cd) {
//     console.log(file);
//     const extension = path.parse(file.originalname).ext;
//     const random_name = v4() + extension;
//     cd(null, random_name);
//   },
// });

// export const uploadProductImage = multer({ storage: product_storage });
