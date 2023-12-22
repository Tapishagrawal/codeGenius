const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userModel } = require("../models/user.model")
const userRoute = express.Router()

userRoute.post("/register", async(req, res)=>{
    const {name, email, gender, password} = req.body
    try{
        bcrypt.hash(password, 10, async(err, hash)=>{
            if(err){
                res.status(200).send(err)
            }else{
                const user = new userModel({
                    name,
                    email,
                    gender,
                    password:hash
                })
                await user.save()
                res.status(200).send({"Msg":"New User Added", "User":user})
            }
        });
    }catch(err){
        res.status(400).send(err)
    }
})

userRoute.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    var token = jwt.sign({ userId: user._id }, 'masai');
                    res.cookie('accessToken', token, {
                        httpOnly: true,
                        secure: true,
                    });
                    res.status(200).send({"Msg":"Login Successfully"})
                }else{
                    res.status(200).send(err)
                }
            });
        }else{
            res.status(200).send({"MSg":"User Not Present"})
        }
    }catch(err){
        res.status(400).send(err)
    }
})

userRoute.get("/logout", (req, res)=>{
    res.clearCookie("accessToken");
    res.status(200).send({ Msg: "Logged out successfully" });
})
module.exports={userRoute}