import { getToken } from 'next-auth/jwt';
import Product from '../../../../../models/Product';
import db from '../../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || (user && !user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};
const putHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  
  if (product) {
    product.sku = req.body.sku;
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.collection_type = req.body.collection_type;
    product.category = req.body.category;
    product.price = Number(req.body.price);
    product.actual_price = Number(req.body.actual_price);
    if(req.body.actual_price) product.off = (req.body.actual_price - req.body.price) / req.body.actual_price * 100;
    product.tag = req.body.tag;
    product.info = {
      dimension : req.body.dimension,
      finish : req.body.finish,
      primary_material : req.body.primary_material,
      top_material : req.body.top_material
    };
    product.image = req.body.image;
    product.image1 = req.body.image1;
    product.image2 = req.body.image2;
    product.image3 = req.body.image3;
    product.image4 = req.body.image4;
    product.image5 = req.body.image5;
    product.desc = req.body.desc;
    product.insta = req.body.insta;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Product updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: 'Product deleted successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};
export default handler;