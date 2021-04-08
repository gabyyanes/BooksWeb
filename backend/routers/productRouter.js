import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const genre = req.query.genre || '';
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const genreFilter = genre ? { genre } : {};
    const count = await Product.count({});
    const products = await Product.find({ 
      ...nameFilter,
      ...genreFilter,
    })
      .skip(pageSize* (page-1))
      .limit(pageSize)
      ;
    res.send({products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  '/genres', 
  expressAsyncHandler(async (req, res) => {
    const genres = await Product.find().distinct('genre');
    res.send(genres);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
