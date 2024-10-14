//Resource user

const express=require('express');
const { createUser } = require('../controllers/userController');

//we have to initailise a router object to add router in a new file
//Routers are used for segregating your routes in different modules
const userRouter=express.Router();

userRouter.post('/',createUser);//this is the route registration

module.exports=userRouter;//exporting the router