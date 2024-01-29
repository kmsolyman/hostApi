// const express = require('express');
// const router = express.Router();

// const Admin = require("./model/adminSchima");

// router.get('/', (req,res)=>{
//     res.send('hellow  auth server router.js ')
//     });


// // create user

// router.post("/createuser", async (req, res) => {
//   try {
//     const bodyData = req.body;
//     const user = new Admin(bodyData);
//     const userData = await user.save();
//     res.send(userData);
//   } catch (error) {
//     res.send(error);
//   }
// });
// // read all user

// router.get("/readalluser", async (req, res) => {
//   try {
//     const userData = await Admin.find({});
//     res.send(userData);
//   } catch (error) {
//     res.send(error);
//   }
// });
// router.get("/read/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await Admin.findById({ _id: id });
//     res.send(user);
//   } catch (error) {
//     res.send(error);
//   }
// });

// // update user

// router.put("/updateuser/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await Admin.findByIdAndUpdate({ _id: id }, req.body, {
//       new: true,
//     });
//     res.send(user);
//   } catch (error) {
//     res.send(error);
//   }
// });

// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const user = await Admin.findByIdAndDelete({ _id: id });
//     res.send(user);
//   } catch (error) {
//     res.send(error);
//   }
// });

// module.exports = router ;