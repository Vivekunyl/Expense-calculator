const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

require("../Database/connect");
const User = require("../model/userSchema");


//route for Registration

router.post('/signup', async (req, res) => {
    const {name , email,phone,work,password,confirmPassword}=req.body;

    if(!name  ||  !email || !phone || !work || !password || !confirmPassword ){
            return res.status(422).json({error:"Please fill the fields properly"});
    }


    try{
        const userExist = await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"User Already exists"});
        }
        else if(password != confirmPassword){
            return res.status(422).json({error:"Password and confirm pass word does not match"});
        }
        else{
            const user = new User({name , email,phone,work,password,confirmPassword});

            const register = await user.save();
            if(register){
                res.status(201).json({success:"User Registerd Successfully"});
            }
            else{
                res.status(500).json({error:"User Failed to Register"});
            }
        }

    }catch(err){console.log(err)};


});


//Route for Login

router.post('/login',async (req,res) => {
    // console.log(req.body);
    // res.json({meassage:"goood"});

    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please fill the data"});
        }

        const validateUser = await User.findOne({email:email});
        
        if(!validateUser){
            res.status(400).json({error:"User not found"});
        }
        else{
            const isValidlogin = await bcrypt.compare(password , validateUser.password);
            const token = await validateUser.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token,{
                expires:new Date(Date.now() + 60480000),
                httpOnly:true
            });

            if(!isValidlogin){
                res.status(400).json({error:"User not found"});
            }
            else{
                res.json({success:"user found!"});
            }
        }

    }catch(err){
        console.log(err);
    };
})


// route for Dashboard

router.get('/dashboard',authenticate,(req,res)=>{
    console.log("hello dashboard");
    res.send(req.verifiedUser);
});

//router for putting data into contact & home

router.get('/getdata',authenticate,(req,res)=>{
    console.log("hello getdata");
    res.send(req.verifiedUser);
});

//getting data of contactfrom client

router.post('/contact',authenticate, async (req,res)=>{
    try{
        const {name,email,phone,messaage} = req.body;
        if(!name || !email || !phone || !messaage){
            console.log("Error in contact Form");
            return res.json({error:"please fill the form correctly"});
        }

        const contactuser = await User.findOne({_id:req.userId});

        if(contactuser){
            const userMessage = await contactuser.addMessage(name,email,phone,messaage);

            await contactuser.save();
            res.status(201).json({message:"message stored Successfully"});
        }

    }catch(err){
        console.log(err);
    }
});

//route for logout
router.get('/logout',(req,res)=>{
    console.log("hello logout");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('user logout');
});

module.exports = router;