import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import Productservice from "../models/Product.service";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { ProductCollection } from "../libs/enums/product.enum";
import { prod } from "mathjs/types";

const productService = new Productservice();
//prodact service module class

const productController: T = {};

/* SPA */
productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    const { page, limit, order, productCollection, search } = req.query;
    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    if (productCollection) {
      inquiry.productCollection = productCollection as ProductCollection;
    }
    if (search) inquiry.search = String(search);

    const result = await productService.getProducts(inquiry);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct");

    const { id } = req.params;
    // console.log("req.member::", req.member);

    const memberId = req.member?._id ?? null,
      result = await productService.getProduct(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.topSellingProduct = async (req: Request, res: Response) => {
  try {
    console.log("topSellingProduct");
    const result = await productService.topSellingProduct();
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error topSellingProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

/* SSR */

productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts"); // log qilishimizni sababi => requestimiz backandga kirib keladimi yana bu (loging standarti)
    //STEP 6

    const data = await productService.getAllProducts();
    //
    //hato
    res.render("products", { products: data });
  } catch (err) {
    console.log("Error, getAllProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct"); // log qilishimizni sababi => requestimiz backandga kirib keladimi yana bu (loging standarti)

    if (!req.files?.length)
      //kirib kelayotgan file lengthizi kamida bitta file bolmasa costimized errorlarimizni yuboryappiz
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);
    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });
    await productService.createNewProduct(data);
    //shuyer
    res.send(
      `<script> alert ("Sucessful creation!"); window.location.replace('/admin/product/all')</script>`
    );
    // res.send("DONE!!");
    //shuyerda togirlanishi kerak bolgan malumot bor
  } catch (err) {
    console.log("Error, createNewProduct", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    //messageyimzni qiymati biz hosil qilgan class dagi errorga dahildor bolsa unda bizni hatoligimzni olib ber aksxolda umimiy hatolikdan something went wrongni olib ber
    res.send(
      `<script> alert ("${message}") window.location.replace('/admin/product/all')</script>,`
    );
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct"); // log qilishimizni sababi => requestimiz backandga kirib keladimi yana bu (loging standarti)
    const id = req.params.id;
    const result = await productService.updateChosenProduct(id, req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
