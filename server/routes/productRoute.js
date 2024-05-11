const express=require("express");
const router=express.Router();

//import here controller

 const{auth}=require("../middleware/Auth")
 const {createProducts ,findProduct ,editProduct,deleteProduct}=require("../controller/products")


//create routes 

 router.post("/createProduct",auth,createProducts)
 router.get("/findProduct/:id",auth,findProduct);
 router.put("/updateProduct/:id",auth ,editProduct);
 router.delete("/deleteProduct/:id",auth ,deleteProduct)





module.exports= router;