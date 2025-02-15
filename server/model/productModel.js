const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema({
    productName:{
        type:String ,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true


    },
    price:{
        type:Number ,
        required:true,
        trim:true
    }
})

module.exports=mongoose.model("PRODUCT",ProductSchema);
