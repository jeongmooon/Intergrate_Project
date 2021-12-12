const express = require("express");
const seesion = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path');
const connect = require('./models')

connect();

dotenv.config();
const corsOptions = {
    origin : true,
    credentials : true,
}
const app = express();
app.set('port', process.env.PORT || 8001)

app.use(morgan('dev'))
app.use('/',express.static(path.join(__dirname, 'public')))
app.use(express.json());//Json 사용 하려면 호출해야함
app.use(express.urlencoded({extended: true}))//배열 받아올 때 사용
app.use(cookie.Parser(process.env.COOKIE_SECRET))
app.use(cors(corsOptions))
app.use(
    seesion({
        resave : false,
        saveUninitialized:true,
        secret: process.env.COOKIE_SECRET,
        cookie:{
            httpOnly:true,
            secure: false,
        },
    })
)

app.use("/member", require("./routes/memberRouter"))

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트 실행')
})