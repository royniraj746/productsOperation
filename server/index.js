const express=require("express");
require("dotenv").config();
const app=express();
const cookies=require("cookie-parser")

require("dotenv").config();
//middeleware of json folder 

app.use(express.json());

//cookies middleware 
app.use(cookies());

const Port=process.env.PORT || 8000 

//routes  AuthUser
const routeAuth=require("./routes/authRoute")
app.use('/api/v1',routeAuth);


//router products 
const routeProduct=require("./routes/productRoute");
app.use('/api/v1/user',routeProduct);

//import here dataBAse 
const {DBConnect}=require("./config/dataBase")
DBConnect();

//run server 
app.listen(Port ,()=>{
    console.log(`server is runing at port${Port}`);
})

app.get("/" ,(req ,res)=>{
    res.send(`<h1>I am Runing RIgth Now</h1>`);
})