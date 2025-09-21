import { NextFunction, Request, Response } from "express"; //?????

import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";

const memberService = new MemberService();
//MemberService MODELdan instins olib yangi object hosil qilaypsmiz

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    /**TRY ning vazifasi => agarda mantiqlar ko'p bo'lib bror qatorda hatolik yuz bersa u o'sha yerda toxtedi va keyingi qatorga otmaydi. U hatolik esa errorga yetib keladi */
    console.log("goHome");
    res.render("home");
    //send || json || redirect || end || render
  } catch (err) {
    console.log("Error, goHome", err);
    res.redirect("/admin");
  }
};

restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
    //typeof res => send | json | redirect | end | render
  } catch (err) {
    console.log("Error, getSignup", err);
    res.redirect("/admin");
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error, getLogin:", err);
    res.redirect("/admin");
    //error hosil bolganda bizni adminga yuboradi
  }
};

//define
restaurantController.processSignup = async (
  req: AdminRequest,
  res: Response
) => {
  //restaurantController degan objectimizni processSignup degan async methodiga 2ta parametr beramiz
  try {
    //Shuyergacha behato kirib keladi va 50 chi qatordan 58 chi qatorgacha qanaqadur hatolik vujudga kelsa TRY uni ushlab olib CATCH ga beradi
    console.log("processSignup"); // log qilishimizni sababi => requestimiz backandga kirib keladimi yana bu (loging standarti)
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.RESTAURANT;
    //nima uchun memeber type ni RESTAURANT deb belgiladik? Sababi agar biz bunday belgilamaganimizda u bydefault USER deb ketardi

    const result = await memberService.processSignup(newMember);
    //memberService objectni processSignup methodiga newMemberni argument sifatida pass qilyapmis undan kelgan natijani kutib RESULT deb nomlangan variablega tenglayapmiz
    //TODO: SESSION
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
      // res.send("DONE!");
      /////
    });
  } catch (err) {
    console.log("Error, processSignup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/signup)</script>`
    );
  }
};

restaurantController.processLogin = async (
  req: AdminRequest,
  res: Response
) => {
  //restaurantController objectini async processLogin methodini hosil qilyapmiz
  //uni ikta parametri bor req va res

  try {
    // try catch dan foydalanyapmiz agarda malumotlarimda qanaqadur hatolik faydo boladigon bolsa serverni crash qilmasdan uni catch da ushlab olyapmiz
    console.log("processLogin");
    //qayerda turganimizni bilish uchun
    // console.log("body:", req.body);
    //req bodiydan kelayotgan malumotlarni korish uchun
    const input: LoginInput = req.body;
    //req.bodydan kelayotgan malumotlarni  constanta inputga tenglayapmiz hamda type ni loging input qilib belgiladik

    // const memberService = new MemberService();
    //member servis classidan memberservis  INSTINSINI hosil qildik
    //MemberService moduledan hosil qilgan objectimizni processLogin methodiga argument sifatida inputni pass qilaymiz
    const result = await memberService.processLogin(input);
    console.log("Result keldi 3", result);
    //memberService objectini processLogin methodi orqali argument sifatida inputni pass qilib uni Call qilyapmiz va natijani kuttirib constanta resultga teglayapmiz
    // shu yeraga natija keladi yani biz logindagi infoni olamiz
    // console.log(result);
    //TODO: SESSION
    req.session.member = result;
    //database di sessioniga borib memberni malumotini joylaydi
    //2. frontendimizni cokkie siga borib SIT ni joylaydi
    //SIT nima => bu sessionga tegishli ID "sdsejlklDEKkeDKel-ka7e" shunga oxshagan
    req.session.save(function () {
      //100% save bolgandan keyin gini ishga tushsin degani
      res.redirect("/admin/product/all");
    });
    //return qilingan malumotni shu yerda qabul qildik va uni res.send orqali uni frontendga jonatyapmiz
  } catch (err) {
    console.log("Error, processLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert ("${message}"); window.location.replace("/admin/login")</script>`
    );
  }
};

//------------

restaurantController.logout = async (req: AdminRequest, res: Response) => {
  //restaurantController objectini async processLogin methodini hosil qilyapmiz
  //uni ikta parametri bor req va res

  try {
    // try catch dan foydalanyapmiz agarda malumotlarimda qanaqadur hatolik faydo boladigon bolsa serverni crash qilmasdan uni catch da ushlab olyapmiz
    console.log("logout");
    //qayerda turganimizni bilish uchun
    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.redirect("/admin");
  }
};

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    res.render("users", { users: result });
    console.log("userResult:", result);
  } catch (err) {
    console.log("Error, getUsers:", err);
    res.redirect("/admin/login");
    //error hosil bolganda bizni adminga yuboradi
  }
};

restaurantController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateChosenUser:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

//-------------

restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  //restaurantController objectini async processLogin methodini hosil qilyapmiz
  //uni ikta parametri bor req va res

  try {
    // try catch dan foydalanyapmiz agarda malumotlarimda qanaqadur hatolik faydo boladigon bolsa serverni crash qilmasdan uni catch da ushlab olyapmiz
    console.log("checkAuthSession");
    //qayerda turganimizni bilish uchun
    if (req.session?.member)
      res.send(
        `<script> alert ("${req.session.member.memberNick}")</script>, `
      );
    else res.send(`<script> alert ("${Message.NOT_AUTHENTICATED}")</script>`);

    //return qilingan malumotni shu yerda qabul qildik va uni res.send orqali uni frontendga jonatyapmiz
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
};

restaurantController.verifyRestaurant = async (
  //STEP 2
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  //restaurantController objectini async processLogin methodini hosil qilyapmiz

  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    //STEP 3

    //buni tenglab product controllerda qabul qilib olishimiz kerak boladi
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert ("${message}"); window.location.replace('/admin/login'); </script>`
      //STEP 4
    );
  }
};

export default restaurantController;

//request => frontenddan kelayatogan requestimiz
//response => backenddan chiqib ketayotgan responsimiz
