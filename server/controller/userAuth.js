const userModel = require("../model/user")
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken');

require("dotenv").config();


//registration  


exports.registration = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            res.status(400).json({
                success: false,
                message: "field missing ,fill then try"
            })
        }

        console.log("user name", userName, email, password)

        const response = await userModel.findOne({ email: email });
        if (response) {
            return res.status(401).json({
                success: false,
                message: "User is alreday registred"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const responseData = await userModel.create({ userName, email, password: hashPassword });

        res.status(201).json({
            success: true,
            data: responseData,
            message: "succesfully user registration"
        })



    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })

    }
}


//login user


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            res.status(401).json({
                success: false,
                message: "field Is missing "
            })
        }

        //validaition of emial iid 
        const userCheck = await userModel.findOne({ email: email });
        //  console.log("email", userCheck);
        if (!userCheck) {
            res.status(401).json({
                success: false,
                message: "user is Not registred"

            })
        }



        const passwordVerify = await bcrypt.compare(password, userCheck.password);
        console.log("password", passwordVerify);
        if (passwordVerify) {

            console.log("1")


            const payload = {
                email: email, id: userCheck._id, role: userCheck.role
            }
            console.log("2")
            const token = await JWT.sign(payload, process.env.Key, { expiresIn: "24h" })
            console.log("3")
            console.log("tokn1", token)
            userCheck.token = token;
            userCheck.password = undefined;



            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true

            }

            res.cookie("token", token, options).status(201).json({
                success: true,
                data: userCheck,
                token: token,
                message: "succesfuflly login "

            })

        }
        else {
            res.status(401).json({
                success: false,
                message: "user not athorized"
            })

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "not login Now"

        })



    }
}