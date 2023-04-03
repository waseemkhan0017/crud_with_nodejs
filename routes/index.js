var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/productModel.js');
router.use(express.json());

mongoose.connect('mongodb+srv://crudapi:waseem123@atlascluster.dl2kzoz.mongodb.net/crudapi?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to database!');
})
.catch((err) => {
  console.log(err);
})


/* GET home page. */
router.get('/products',async(req, res, next) => {
  try{
    const products = await Product.find();
    res.status(200).json(products);
  }catch(err){
    console.log(err);
    // res.status(500).json({message:err.message});
  }
});

// grt by id
router.get('/products/:id',async(req, res, next) => {
  try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
  }catch(err){
    
    res.status(500).json({message:err.message});
  }
});



/*
router.post('/', (req, res, next) => {
  const product = new product({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price
  });
  product.save().then(createdProduct => {
    res.status(201).json({
      message: "Product added successfully",
      productId: createdProduct._id
    });
  });
});
*/
router.post('/', async(req, res, next) => {
  try{
      const product= await Product.create(req.body);
      res.status(201).json(product);
  }catch(err){
    res.status(500).json({message:err.message});
  }
});


// put
router.put('/products/:id', async(req, res, next) => {
  try{
      const {id} = req.params;
      const product = await Product.findByIdAndUpdate(id,req.body);
      if(!product){
        return res.status(404).json({message:"Product not found"});
      }
      res.status(200).json(product);
  }catch(err){
    res.status(500).json({message:err.message});
  }
});

// delete
router.delete('/products/:id', async(req, res, next) => {
  try{
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id);
      if(!product){
        return res.status(404).json({message:"Product not found"});
      }
      res.status(200).json(product);
  }catch(err){
    res.status(500).json({message:err.message});
  }
});



module.exports = router;
