const express=require("express");
const router=express.Router();

//import here controler 

const {registration,login}=require('../controller/userAuth')

// const {auth ,authentic}=require('../middelwere/Auth')


//create routes 

router.post("/registration" ,registration);
router.post("/login",login)





module.exports= router;