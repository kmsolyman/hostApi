const mongoose = require('mongoose');
// const DB = process.env.DATABASE ;

// mongoose.connect(DB,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// }).then(()=>{
//     console.log('connect successfully db')
// }).catch((err)=> console.log('no connection db massage'));

const DB ="mongodb+srv://kmsolyman:solyman@cluster0.7wpalig.mongodb.net/token?retryWrites=true&w=majority";
 
mongoose.connect(DB,
  // {
  //  useNewUrlParser:true,
  //  useCreateIndex:true,
  //  useUnifiedTopology:true,
  //  useFindAndModify:false
  // }
  )
  .then(()=>{console.log("connect successfull mongose");
}).catch((err)=> console.log('no connect mongose'));
