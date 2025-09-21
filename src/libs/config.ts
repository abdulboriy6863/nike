export const AUTH_TIMER = 24;
export const MORGAN_FORMAT = `:method :url  :response-time  [:status] \n`;

//MORGAN_FORMAT bizni nima qilib beryaoti methodini aytyapti (post, get), url ini yani (admin/signup) shu yerdan degani, nechchi daqiqada javob olib kelyatkanini va statusini qanday turdagi javob degani yani (togri javon [200], false qilymat [400]) shunga o'xshagan

//Login mehanizimni qurdi

import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
  return typeof target === "string"
    ? new mongoose.Types.ObjectId(target)
    : target;
};
