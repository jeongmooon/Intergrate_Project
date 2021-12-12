const express = require("express");
const router = express.Router();
const User = require('../models/user')

// 회원가입
router.post("/signup", async(req,res)=>{
    try {
        const obj ={
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        }
        const user = new User(obj);
        await user.save();
        res.json({message:"회원가입 완료"});
    } catch (err){
        console.log(err)
        res.json({message:false});
    }
})

// 로그인
router.post('/signin', async(req, res)=>{
    try{
        // 아이디 존재 확인
        await User.findOne({email: req.body.email}, async(err, user)=>{
            if(err){
                console.log(err);
            } else {
                console.log(user)
                if(user){
                    //아이디 존재하면 비밀번호 일치 확인
                    console.log(req.body.password);
                    console.log(user.salt)
                }
            }
        })
    }
})

module.exports = router;