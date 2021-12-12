const express = require("express");
const router = express.Router();
const User = require('../models/user')
const crypto = require('crypto');

// 회원가입
router.post("/signup", async(req,res)=>{
    try {
        let obj = {email: req.body.email};

        let user= await User.findOne(obj);

        if(user){
            res.json({
                message:"중복된 이메일, 새로운 이메일을 등록하세요",

                //중복체크 보내는 메세지 1은 중복임
                dumpYn : "1"
            });
        } else {
            crypto.randomBytes(64, (err, buf)=>{
                if(err){
                    console.log(err);
                } else {
                    crypto.pbkdf2(
                        req.body.password,
                        buf.toString("base64"),
                        100000,
                        64,
                        "sha512",
                        async (err, key)=>{
                            if(err){
                                console.log(err)
                            } else{
                                console.log(key.toString("base64"))
                                buf.toString("base64");
                                obj ={
                                    email:req.body.email,
                                    name:req.body.name,
                                    password:key.toString("base64"),
                                    salt:buf.toString("base64")
                                }
                                user= new User(obj);
                                await user.save();
                                res.json({message:"회원가입완료",
                                // 중복체크때 1로 사용
                                dumpYn:"0"})
                            }
                        }
                    )
                }
            })
        }
    } catch (err){
        console.log(err)
        res.json({message:false});
    }
})

// 로그인
router.post("/signin", async(req, res)=>{
    try {
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
                    crypto.pbkdf2(
                        req.body.password,
                        user.salt,
                        100000,
                        64,
                        "sha512",
                        async ( err, key )=>{
                            if(err){
                                console.log(err);
                            } else {
                                console.log(key.toString("base64"))

                                const obj ={
                                    email:req.body.email,
                                    password: key.toString("base64")
                                }

                                const userLog = await User.findOne(obj);

                                if(userLog){
                                    //userLog가 있다면
                                    await User.updateOne(
                                        {
                                            email:req.body.email
                                        }
                                    )
                                    req.session.email = user.email;
                                    res.json({
                                        message:"로그인 완료",
                                        _id:userLog._id,
                                        email:userLog.email
                                    })
                                } else {
                                    if(user.signinCount>9){
                                        res.json({
                                            message:"이메일, 패스워드가 10회이상 틀려 잠굼"
                                        })
                                    } else{
                                        await User.updateOne(
                                            {
                                                email:req.body.email
                                            },
                                            {$set:{signinCount : user.signinCount+1}}
                                        )
                                        if(user.signinCount >= 10) {
                                            await User.updateOne(
                                                {
                                                    email:req.body.email
                                                },
                                                {$set:{lockAccount:true}}
                                            )
                                            res.json({
                                                message:"이메일 or 비번 10회이상 틀려 잠겼슴"
                                            })
                                        }else{
                                            res.json({
                                                message:"이메일or 패스워드 틀림"
                                            })
                                        }
                                    }
                                }
                            }
                        })
                } else {
                    res.json({message:"이메일 or 비번 틀림"})
                }
             }
        });
    } catch (err){
        console.log(err);
        res.json({message:"로그인 실패"})
    }    
});


module.exports = router;