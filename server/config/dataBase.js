const mongoose=require("mongoose");
require("dotenv").config();
exports.DBConnect=async()=>{
    mongoose.connect(process.env.MONGODB_URL ,{})
    .then(()=>{
        console.log("DataBAse connected Succesfully ")
    })
    .catch((error)=>{
        console.log("DB is not connected succssdfully")
    })
}
