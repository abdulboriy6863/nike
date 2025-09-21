import Errors, { HttpCode } from "../libs/Errors";
import ProductModel from "../schema/Product.model";
import { Message } from "../libs/Errors";
import {
  Product,
  ProductInput,
  ProductInquiry,
  ProducUpdatetInput,
} from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";

class Productservice {
  private readonly productModel;
  public viewService;

  constructor() {
    this.productModel = ProductModel;
    this.viewService = new ViewService();
  }

  /* SPA */
  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    const match: T = { productStatus: ProductStatus.PROCESS };

    if (inquiry.productCollection)
      match.productCollection = inquiry.productCollection;
    if (inquiry.search) {
      match.productName = { $regex: new RegExp(inquiry.search, "i") };
    }

    const sort: T =
      inquiry.order === "productPrice"
        ? { [inquiry.order]: 1 }
        : { [inquiry.order]: -1 };
    const result = await this.productModel
      .aggregate([
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
      ])
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    console.log("result", result);

    return result;
  }

  public async getProduct(
    memberId: ObjectId | null,
    id: string
  ): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);

    let result = await this.productModel
      .findOne({
        _id: productId,
        productStatus: ProductStatus.PROCESS,
      })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    //TODO:  first => view log creation
    if (memberId) {
      //check existence

      const input: ViewInput = {
        memberId: memberId,
        viewRefId: productId,
        viewGroup: ViewGroup.PRODUCT,
      };

      console.log("input::::", input);

      const existView = await this.viewService.checkViewExistence(input);

      if (!existView) {
        //insert view
        console.log("Planning to insert new view");

        await this.viewService.insertMemberView(input);
        result = await this.productModel
          .findByIdAndUpdate(
            productId,
            { $inc: { productViews: +1 } }, // product view ga kirib bittaga oshir Increment
            { new: true }
          )
          .exec();
      }
    }

    return result;
  }

  /* SSR */

  public async getAllProducts(): Promise<Product[]> {
    // stringni object id da o'zgartiramiz
    const result = await this.productModel.find().exec();
    //product skima  modulimizni find static methodini chaqiryappiz exacution bilan yakunlab natijani kuttirib result ga tenglayappiz
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    console.log("result", result);
    return result;
  }

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.error("Error, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      //error class (Errors)
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProducUpdatetInput
  ): Promise<Product> {
    // stringni object id da o'zgartiramiz
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      //filter, update, option
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    console.log("result", result);
    return result;
  }
}

export default Productservice;
