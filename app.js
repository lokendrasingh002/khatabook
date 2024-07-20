const express =require("express")
const app=express()
const cookieParser=require("cookie-parser")
const path=require("path")

require('dotenv').config()
const indexRouter=require("./routes/indexRouter")
const hisaabRouter=require("./routes/hisaabRouter")
const db=require("./config/mongoose-connection.js")
const flash=require("connect-flash")
const expressSession=require("express-session")
app.set("view engine",'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"rajput"
}));

app.use(flash());
app.use(cookieParser())


app.use('/',indexRouter)
app.use("/hisaab",hisaabRouter)




app.listen(process.env.PORT || 3000)