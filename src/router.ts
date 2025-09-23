import express from "express";
const router = express.Router();
import memberController from "./controller/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controller/product.controller";
import ordercontroller from "./controller/order.controller";

/* MEMBER */
router.get("/member/restaurant", memberController.getRestaurant);
router.post("/member/login", memberController.login);

router.post("/member/signup", memberController.signup);

router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);

router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);

router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);

router.get("/member/top-users", memberController.getTopUsers);

/* PRODUCT */
router.get("/product/topSellingProduct", productController.topSellingProduct);

router.get("/product/all", productController.getProducts);
router.get(
  "/product/:id",
  memberController.retriveAuth,
  productController.getProduct
);

/* ORDER */
router.post(
  "/order/create",
  memberController.verifyAuth,
  ordercontroller.createOrder
);

router.get(
  "/order/all",
  memberController.verifyAuth,
  ordercontroller.getMyOrders
);

router.post(
  "/order/update",
  memberController.verifyAuth,
  ordercontroller.updateOrder
);

// router.get("/", memberController.goHome);

// router.get("/login", memberController.getLogin);

// router.get("/signup", memberController.getSignup);

export default router;
