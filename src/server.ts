import dotenv from "dotenv"; //EXTERNAL package
//1.ENVIRONMENTAL VARIABLElarni integratsia qilyapti
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
// 2.va CONFIG methodi orqali ularni chaqirib olyapmiz
import mongoose from "mongoose"; // EXTERNAL package
// 3.MONGOOSE ni qiladigon ishi bizga TSP ni hosil qilib beryapti
// 4.TSP nima? (doimiy boglanish)
//5.Qayer bilan doyimiy boglanish? (BACKEND bilan DATABASE oraligida TSP connectiondi hosil qiladi)
import app from "./app";
//10. Bu EXPRESS functioni bizga tahlab bergan app objecti.

// console.log("PORT:", process.env.PORT);
// console.log("MONGO_URL:", process.env.MONGO_URL);

//6.Qachonki muaffaqiyatli ulansa
mongoose
  .connect(process.env.MONGO_URL as string, {})
  // 7.mongoose OBJECTini connect degan METHODini chaqiramiz va argumnet sifatida 2ta qiymatni pass qilyapmiz
  .then((data) => {
    //8.bu asyn methodi bo'lib muaffaqiyatli ulanish bo'lsa THEN ishga tushadi
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function () {
      console.info(`The server is running successfully on port: ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
    // 11.Agarda app objectini listen degan methodini yozsak u bizni serverimizni yurgizib beradi va
    // Agar hato bolmasa keyin BACKEND SERVERNI ishga tushiramiz
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err));
//9.Agarda hato bo'lsa CATCH ishga tushadi

//12.DATABASE BILAN DOYIMIY ALOQANI O'RNATDIK ENDI (APP.TS ) ORQALI BACKEND SERVERNI QURISHNI BOSHLADIK
