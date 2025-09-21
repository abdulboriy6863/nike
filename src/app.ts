import cors from "cors";
import express from "express";
import path from "path"; //????
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";

const MongoDBStore = ConnectMongoDB(session);
//tepadegi pacakagedan (instance) olini va ConnectMongoDB methodiga (session) argumnet sifatida call qildik va ikkalasi ishlab mongodbstore hosil qilindi
const store = new MongoDBStore({
  //MongoDBStore bu class bolib kelajakda mongodb ga borib ornashadigon session collectionni hosil qilyapti
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});
// bularni hammasi databasda session bolimini hosil qilish uchun kerak

/* 1-ENTRANCE*/ // KIRISH QISMIDA NIMA QILINADI??
const app = express(); //OBJECT
//expressni exacution (qurish) natijasida app objectini qo'lga kirityapmiz. Bu object bilan nima qilyapmiz? BACKEND SERVERini quryapmiz

app.use(express.static(path.join(__dirname, "public"))); //MiddlaWere DP => Public folderini frontendga ochiqlayapti
app.use("/uploads", express.static("./uploads"));

app.use(express.urlencoded({ extended: true })); //MiddlaWere DP => TRADITIONAL API lar uchun  hizmat qiladi

app.use(express.json()); //MiddlaWere DP => REST API lar uchun hizmat qiladi
//backend bilan fronted orasida sof holatda json formatdagi malumotlarni oldi berdi qiladi.
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser()); //????????

app.use(morgan(MORGAN_FORMAT)); //MiddlaWere DP => Loging jarayonini tashkillashtirib beradi
//serverga HTTP dan kelayaotgan malumotlarni log qilish yani yozib berish uchun ishlatiladi

/* 2-SESSIONS*/
app.use(
  session({
    //session core functionga bitta objectni argument sifatida pass qilyapmiz va buni ichi key va value lardan tashkil topgan ekan
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 3, // 3h davomida umr koradi
    },
    store: store,
    resave: true, //har kirganda ACTIVE holati kirgan vaqidan boshlab 3 soat gacha hisoblaydi
    saveUninitialized: true,
    // login bolgan va login bolmagan odamlarni ham sessionlarni hosil qilish
  })
);
//bizni sessionimiz hosil bolganda bizni mongodbyimiznda session collectioniga murojat etadi

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

/* 3-VIEWS*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* 4-ROUTERS*/
// TEPADA QILINGAN BARCHA ISHLARIMIZ ROUTERLAR UCHUH QILINYAPTI
//ROUTERLAR nima? ROUTERLAR API lar to'plami
app.use("/admin", routerAdmin); // SSR: EJS

app.use("/", router); // SPA: REACT => Frontend ni Frontend da qurish
// middleware design pattern
//Burak backend serverni REACT loyihamizga (rest api ) server sifatida ishlatamiz

export default app;

//BSSR = Traditional API + Rest API orqali boladi
//SPA = Rest API orqali bo'ladi

//USE methodi doyim MIDDLAWERE DP lari uchun ishlaydi
