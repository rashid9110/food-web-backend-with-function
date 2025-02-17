const express=require("express")
const cookieParser=require('cookie-parser');
const cors=require('cors');
// const badyParser=require('body-parser')

const ServerConfig= require('./config/serverConfig');
const connectDB=require('./config/dbConfig');
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRouter");

const app=express();
app.use(cors({
    origin:ServerConfig.FRONTEND_URL,
    credentials: true
}));  
   
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true})); 

//Routing middleware
//if your res route starts with /User then handle it using userRouter
app.use('/User',userRouter);//connect the router to the server
app.use('/carts',cartRouter);
app.use('/auth',authRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);

app.get('/pong',(req,res)=>{
    console.log(req.body); 
    console.log(req.cookies); 
    return res.json({message: 'pong'});     
});

    // app.post('/photo',uploader.single('IncomingFile'),async(req,res)=>{
    //     console.log(req.file);
    //     const result =await cloudinary.uploader.upload(req.file.path);
    //     console.log('result from cloudinary',result);
    //     await fs.unlink(req.file.path);
    //     return res.json({message: 'ok'});
    // })


app.listen(ServerConfig.PORT,async ()=>{
    await connectDB(); 
    console.log(`Server started at port ${ServerConfig.PORT}`); 
});
 

//localhoust:5500/User - POST
//localhoust:5500/carts/1234 -GET    