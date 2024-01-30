const mongoose = require('mongoose');

// const jwt = require("jsonwebtoken");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config({ path:'./config.env'});

const useSchema = new mongoose.Schema({
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
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }, 
    date:{
        type:Date,
        default:Date.now
    },
    massages:[
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
                massage:{
                    type:String,
                    required:true
                },
              }
    ],
    tokens:
    [
        {
             token :
             {
                   type:String,
                   required:true
             }
         } 
    ]
})


// we arr hassing password

useSchema.pre('save' , async function (next){
    
    if(this.isModified('password')) {
        this.password = await (this.password,12);
        this.cpassword = await (this.cpassword,12);

     }
     next();
});

//   we are generate token 2
    useSchema.methods.generateToken = async function(){
    try{
          let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
          this.tokens= this.tokens.concat({ token:token });
          await this.save();
          return token ;
   }catch(err){
         console.log(err)
    }
  }
//store the massage fill
useSchema.methods.addMassage = async function(name,email,massage,phone){
    try{
          this.massages= this.massages.concat({name,email,massage,phone});
          await this.save();
          return this.massages;
   }catch(err){
         console.log(err)
    }
  }


const User = mongoose.model('USER', useSchema);

module.exports = User ;


