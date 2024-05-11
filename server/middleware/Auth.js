
const UserModel = require("../model/user");
const JWT = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {

        //three awy to find the token 
       const token = req.body.token || req.cookies.token || ( req.headers['authorization']).split(' ')[1]
       
        console.log("authToken ", token); 
        if (!token) {
           return res.status(501).json({
                success: false,
                message: "Token is missing"
            })
        }
        try {

            const decoded = await JWT.verify(token, process.env.Key);
            req.user = decoded;
            console.log("decodeddata", decoded);

        }
        catch (error) {
           return res.status(501).json({
                success: false,
                message: "token not valid"
            })

        }

        next();


    } catch (error) {
      return  res.status(501).json({
            success: false,
            message: "this for Teacher user",
            message: error.message
        })

    }

}