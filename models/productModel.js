const mongoose = require('mongoose');
const productSchema= new mongoose.Schema(
    {
    name:{
        type :  String,
        required:[true,'Enter your name']
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    
  }
);

const Product=mongoose.model('Product',productSchema);
module.exports=Product;

// module.exports = mongoos.model("Product", ProductSchema);