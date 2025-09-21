import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controller/restaurant.controller";
import productController from "./controller/product.controller";
import makeUploader from "./libs/utils/uploader";

/**Restaurant */
routerAdmin.get("/", restaurantController.goHome);

routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
//router objectini post degan methdodini call qilyapmiz va ikta argumentni pass qildik birinchichi URL yani LOGIN degan urlga kelganda restaurantController objectini processLogin degan methodini call qilyapmiz

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup
  );
//
//URLimiz SIGNUP methodimiz POST manashu 2ta shart bajarilsa restaurantController objectimizni processSignup methodiga jonatadi
routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

/*Product */
routerAdmin.get(
  "/product/all",
  //router adminimizni get methodi va urli qanotlantirilsa
  restaurantController.verifyRestaurant,
  // restaurant controller objectimizni verifay restaurant methodiga yuboryapti authorization ni tekshirish uchun
  productController.getAllProducts
);
routerAdmin.post(
  "/product/create",
  restaurantController.verifyRestaurant, // authorization
  //oraliq mantiq middlawere
  makeUploader("products").array("productImages", 5),
  //make uploader middlawere, req orqali malumotlarini otkizyapti
  //frontendtan kirib kelayotgan fayllarimizni yuklab beradigon uploader (multer)
  productController.createNewProduct
);
routerAdmin.post(
  "/product/:id",
  //productimizni shu urli qanotlantirilganligi uchun
  restaurantController.verifyRestaurant,
  productController.updateChosenProduct
);

/*User */
routerAdmin.get(
  "/user/all",
  restaurantController.verifyRestaurant,
  restaurantController.getUsers
);

routerAdmin.post(
  "/user/edit",
  restaurantController.verifyRestaurant,
  restaurantController.updateChosenUser
);

export default routerAdmin;

//BURAK ADMINKAsini loyihasini APIlarini hammasi shu yerdan o'tadi

//GET methodi loging page ga yuboradi
/*POST methodi get pageni ichidagi qiladigon ishlarimizni boshqaradi
malumotlarni mutation qilish uchun
*/
