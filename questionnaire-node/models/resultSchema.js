import mongoose from "mongoose";
const { Schema } = mongoose;


/** result model */
const resultModel = new Schema({
    mobile : { type : String },
    wechatUsername: {type: String},
    result : { type : Array, default : []},
    createdAt : { type : Date, default : Date.now}
})

export default mongoose.model('result', resultModel);