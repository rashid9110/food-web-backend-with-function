
const express=require("express")
// const badyParser=require('body-parser')

const ServerConfig= require('./config/serverConfig')
const connectDB=require('./config/dbConfig');
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
// const User = require("./schema/userSchema");

const app=express();

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended: true}));

//Routing middleware
//if your res route starts with /User then handle it using userRouter
app.use('/User',userRouter);//connect the router to the server

app.use('/carts',cartRouter);

app.post('/ping',(req,res)=>{
    console.log(req.body); 
    return res.json({message: 'pong'});    
});

app.listen(ServerConfig.PORT,async ()=>{
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}`);

    
});
 

//localhoust:5500/User - POST
//localhoust:5500/carts/1234 -GET