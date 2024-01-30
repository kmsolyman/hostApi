const mongoose = require('mongoose');

const DATABASE ="mongodb+srv://kmsolyman:solyman@cluster0.7wpalig.mongodb.net/token?retryWrites=true&w=majority";
 
mongoose.connect(DATABASE,
  {
   useNewUrlParser:true,
  //  useCreateIndex:true,
   useUnifiedTopology:true,
  //  useFindAndModify:false
  }
  )
  .then(()=>{console.log("connect successfull mongose");
}).catch((err)=> console.log('no connect mongose'));
