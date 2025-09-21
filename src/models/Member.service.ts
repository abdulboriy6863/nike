import MemberModel from "../schema/Member.model";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberStatus, MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { threadCpuUsage } from "process";

class MemberService {
  private readonly memberModel;

  //pascalcase
  constructor() {
    this.memberModel = MemberModel;
  }

  /* SPA */

  //interface
  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);

      result.memberPassword = "";
      //password frontendga bormasligi uchun unga qiymat bermayapmiz, shunchaki bo'sh string qaytaryapmiz
      return result.toJSON();
    } catch (err) {
      console.error("Error, model:siginup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NIKE_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    //TODO: consider member status later
    const member = await this.memberModel
      //skima model

      .findOne(
        {
          memberNick: input.memberNick,
          memberStatus: { $ne: MemberStatus.DELETE },
          //delete bolgan userni qaysi login bolishini cheklayapmiz
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 }
        //bizga mahfiy bolgan malumotlarni database dan chaqirib olish mehanizmi
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NNICK);
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCED_USER);
    }
    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    // const isMatch = input.memberPassword === member.memberPassword;
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.memberModel.findById(member._id).lean().exec();
  }

  public async getMemberDetail(member: Member): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
      .findOne({
        _id: memberId,
        memberStatus: MemberStatus.ACTIVE,
      })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async updateMember(
    member: Member,
    input: MemberUpdateInput
  ): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: memberId }, input, { new: true })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }

  public async getTopUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({
        memberStatus: MemberStatus.ACTIVE,
        memberPoints: { $gte: 1 },
      })
      .sort({ memberPoints: -1 })
      .limit(4)
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async getRestaurant(): Promise<Member> {
    const result = await this.memberModel
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async addUserPoint(member: Member, point: number): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);

    const result = await this.memberModel.findByIdAndUpdate(
      {
        _id: memberId,
        memberType: MemberType.USER,
        MemberStatus: MemberStatus.ACTIVE,
      },
      { $inc: { memberPoints: point } },
      { new: true }
    );

    return result;
  }
  /* BSSR */

  //interface
  public async processSignup(input: MemberInput): Promise<Member> {
    //processSignup async methodini unga INPUT nomli bitta parametrni yozyapsiz va async methodi bo'lganligi uchun PROMISEda javob berib MEMBERNI qaytaradi
    const exist = await this.memberModel
      //member skima Model ni findOne static methodini chaqiryapmiz unga bitta qiymatda objectini argument sifatida beryapmiz hamda ketidan exacution qilib natijani kutib constanta exist ga tenglayapmiz
      .findOne({
        memberType: MemberType.RESTAURANT,
      })
      .exec();
    console.log("exist", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    console.log("before:", input.memberPassword);
    const salt = await bcrypt.genSalt();
    console.log("salt qilindi", salt);
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log("INPUT", input);

    try {
      const result = await this.memberModel.create(input);
      console.log("RESULT::", result);

      // const result = await tempResult.save();
      console.log("sjnksjsnkn", result);

      result.memberPassword = "";
      //password frontendga bormasligi uchun unga qiymat bermayapmiz, shunchaki bo'sh string qaytaryapmiz
      return result;
    } catch (err) {
      console.log("messsage", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      //////
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    //memberservis classimzni ichida async processLogin ni hosil qilyapmiz paramter sifatida inputni pass qilyapmiz va u promisda member qaytaradi
    console.log("Shuerga keldi:");

    const member = await this.memberModel

      //member skima modelini findone static methodini call qilib unga ikta argument pass qilyapti

      // natijanni kuttirib konstanta memberga tenglayapmiz (last)

      .findOne(
        { memberNick: input.memberNick, memberType: MemberType.RESTAURANT }, //FILTER buni vazifasi databasadan membernik boyicha malumotlarni izledi
        { memberNick: 1, memberPassword: 1 } //agar malumot topiladigon bolsa membernick va Member passwordni majburlab olish
        //bizga mahfiy bolgan malumotlarni database dan chaqirib olish mehanizmi
        //.select("+memberPassword")
      )
      .exec();
    console.log("Shuyerga keldi 2");
    // member malumotlarni tekshirish uchun uni log qilib olddik
    //executionni ishga tushurib qureyni yakunladik
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NNICK);
    //agarda member malumotlarni falsy boladigon bolsa ozimizni costumise ERROR classimizdan foydalannib (HttpCode.NOT_FOUND, Message.NO_MEMBER_NNICK) shu hatolarni berishini aytyappiz
    //agar bu yerda hatolik bolmedigon bolsa

    const isMatch: boolean = await bcrypt.compare(
      //bcrypt objectini compare methodini call qilib unga ikta argumnetni pass qilyapmiz
      input.memberPassword, //frontendan dan kelgan memberpassword ni
      member.memberPassword // database da mavjud bolgan member passwor
      //bilan taqqoslab natijani kuttirib isMatch degan constantaga tengladik
    );

    // const isMatch = input.memberPassword === member.memberPassword;
    if (!isMatch) {
      //agarda yana falsy qiymat qaytadigon bolsa yana  ERRORS degan classdan foydalanib  shu hatoliklarni beryapmiz
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    //agarda hech qanday hotolik bolmaydigon bolsa member skima modelini findone static methodini call qilib unga member._id ni argument sifatida pass qilyapmiz hamda executionni yakunlab natijani kuttirib uni return qildik
    return await this.memberModel.findById(member._id).exec();
    ///buyerda hoto bor edi findById bolishi kerak edi ekan men esa findOne qilgan ekamman

    //qaytatdan member malumotlarni topib keladida va uni reeturn qilib Frontendga chiroyli mantiqlarni jonatadi
  }

  public async getUsers(): Promise<Member[]> {
    //qaytarish qiymati array of member
    const result = await this.memberModel
      .find({ memberType: MemberType.USER })
      .exec();
    //membertypeni qiymati user bolganini izlaydi
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    //qaytarish qiymati array of member
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      .exec();
    //membertypeni qiymati user bolganini izlaydi
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    return result;
  }
}

export default MemberService;

//STATIC METHODLAR faqat CLASS lar bilan ishlaydi

//MemberSchemaModelimiz boladi + unga static methodlar qo'shilad + natija QUERY bo'ladi exect(), select()

//this.MemberModel.find().limit(5).sort().exec()
//this.MemberModel - MemberSchemaModelimiz + find() > QUERY + limit(5) > QUERY + exec() > data bo'ladi
