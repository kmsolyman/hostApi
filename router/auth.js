const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const Authentication =  require("../medlleware/authenticate");
const dotenv = require('dotenv');


// const cookieParser = require('cookie-parser')

// app.use(cookieParser())

dotenv.config({ path:'./config.env'});


const User = require("../model/userSchema");
 
router.get('/', (req,res)=>{
    res.send('Hellow this Server is Runing  at.. ')
    });

// Register  >>

router.post('/register',async (req,res)=>{
   
  const{name,email,phone,work,address,password,cpassword} = req.body;
  
   if(!name||!email||!phone||!work|| !address || !password||!cpassword) {
    return res.status(422).json({error:"pless fill secound the property"});
   }
 
  try {
            
 const useraexist = await User.findOne({ email:email })
    if (useraexist) {
      return res.status(422).json({error:"Email alradi exixting"});
}
else if (password !== cpassword) {
  return res.status(422).json({error:"password are not match alradi exixting"});
}
else{
  const user = new User({name,email,phone,work,address,password,cpassword});

  // hase password
   await user.save() ;
  
  res.status(201).json({massage:"Successfull"})
}

  } catch (err) {
    console.log(err)
  }


  })

  // LOGIN >>

 
  router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(401).send({error:"please filled the data properly"});
    }
    try {
        const loginUser=await User.findOne({email:email});
        if(!loginUser){
            return res.status(400).send({error:"not found"});
        }
        const isMatch = await (password,loginUser.password);    
        if(isMatch){
            const token=await loginUser.generateToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+15000000),
                httpOnly:true,
                //secure:true  //it is applicable when we use https method
            })
            console.log(token);
            res.send({message:"login success"});
        }else{
            res.status(400).send({error:"please enter correct data"})
        }
          
    } catch (error) {
        res.status(400).send(error)
    }
})

// contact page

router.post("/contact",Authentication, async (req,res)=>{
  try {
     const {name,email,massage,phone} = req.body;
       if(!name || !email || !massage ||!phone){
            console.log("error in contact from");
        return res.json({error:"plzz filled the connect from"})
       }
     const userContest = await User.findOne({_id:req.userID});

     if(userContest){
          userMassage = await userContest.addMassage(name,email,massage,phone);
        
          await userContest.save();
          
           res.status(201).json({massage:"user contact successfull"})
        }

  } catch (error) {
    console.log(error);
  }
}),


 // Profile page medallware
 
 router.post("/UpdateProfile",Authentication, async (req,res)=>{
  try {
     const {id ,name,email,phone,work,address} = req.body;
   
    //  const userContest = await User.findOne({_id:req.userID});

       userMassage = await User.updateOne({_id:req.rootUser},{$set:{name,email,phone,work,address}});
        console.log(userMassage);
        await User.userMassage.save();
          
           res.status(201).json({massage:"user updateProfile successfull"})
        

  } catch (error) {
    console.log(error);
  }
}),
 
 // Admin page medallware

 router.get("/userProduct",Authentication,async(req,res)=>{
  // console.log("Hellow getdata");
    const userDate = User.find() ;
   
    res.status(200).json(userDate);

    // res.send(req.rootUser);
    // res.send(userDate);
}),

 // Profile page medallware

router.get("/profile",Authentication,(req,res)=>{
  // console.log("Hellow about");
  res.send(req.rootUser);
}),

 // Home page medallware

 router.get("/getdata",Authentication,(req,res)=>{
  // console.log("Hellow getdata");
  res.send(req.rootUser);
}),


 // logOut in 
  router.get("/logOut",(req,res)=>{
    // console.log("Hellow logout");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("user Logout");
    })


    // crud 

    // create user
    
    router.post("/createuser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});
// read all user

router.get("/readalluser", async (req, res) => {
  try {
    const userData = await User.find({});
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

router.get("/read/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

 // update user

router.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router ;
