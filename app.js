const express = require("express");
const app = express();
require("./database/conn");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { default: mongoose } = require("mongoose");


dotenv.config({ path:'./config.env'});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// db connection

const Product = require("./model/adminSchima");

// import model image

app.use(cookieParser())

app.use(require('./router/auth')); 
// app.use(require('./Adminroute/adminAuth'));
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); 


mongoose
  .connect("mongodb+srv://kmsolyman:solyman@cluster0.7wpalig.mongodb.net/token?retryWrites=true&w=majority")
  .then(() => {
    console.log("db connection succesfully");
  })
  .catch((error) => {
    console.log(error);
  });



// create user

app.post("/newProductsAdd", async (req, res) => {
  try {
    const bodyData = req.body;
    const userData = new Product(bodyData);
    const user = await userData.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// read all user

app.get("/Productreadalluser", async (req, res) => {
  try {
    const userData = await Product.find({});
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

 // read user

app.get("/Productread/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Product.findById({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// update user

app.put("/Productupdateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// delet user

app.delete("/Productdelete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Product.findByIdAndDelete({ _id: id });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

require("./database/conn");
const User = require("./model/userSchema");


mongoose.connect(process.env.DATABAS || `mongodb+srv://kmsolyman:solyman@cluster0.7wpalig.mongodb.net/token?retryWrites=true&w=majority`);


app.listen(PORT,()=>{
console.log('my server is runing at port succefull ${port}')})


