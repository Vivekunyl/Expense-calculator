const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true
    },

    work:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    confirmPassword:{
        type:String,
        required:true
    },

    balance:{
        type:Number
    },

    expenseTitle:{
        type:String
    },
    messages:[
        {
            name:{
                type:String,
                required:true
        
            },
        
            email:{
                type:String,
                required:true
            },
        
            phone:{
                type:Number,
                required:true
            },
        
            message:{
                type:String,
                required:true
            }
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

});

//Hashing the password

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword,12);
    }
    next();
});

//generating Token

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

//storing the message

userSchema.methods.addMessage = async function(name,email,phone,messaage){
    try{
        this.messages = this.messages.concat({name:name,email:email,phone:phone,messaage:messaage});
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err);
    }
}


const User = mongoose.model('USERDATA',userSchema);
module.exports = User;