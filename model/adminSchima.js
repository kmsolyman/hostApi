
const mongoose = require('mongoose');


const useSchema = new mongoose.Schema({
    //  id:{
    //     type:String,
    //     required:true
    //  } ,  
    name:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        stock:{
            type:Number,
            required:true
        },
        reviews:{
            type:Number,
            required:true
        },
        stars:{
            type:Number,
            required:true
        },
        colors:[{
            type:String,
            required:true
        }],

        image:
    [ 
        
           {
                   type:String,
                   required:true
             }
            
    ],
        description:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        featured:{
            type:Boolean,
            required:false
        }, 
        shipping:{
            type:String,
            required:true
        }, 
    })



const Product = mongoose.model('Product', useSchema);

module.exports = Product ;
