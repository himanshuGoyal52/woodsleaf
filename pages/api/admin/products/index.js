import { getToken } from 'next-auth/jwt';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'POST') {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    sku : 'Sample SKU',
    name: 'sample name',
    slug: 'sample_name_' + Math.random(),
    collection_type : 'smaple (wooden)',
    category : 'smaple (chair)',
    price: 0,
    actual_price : 0,
    image: 'sample image url here',
    image1: 'sample image1 url here',
    image2: 'sample image2 url here',
    image3: 'sample image3 url here',
    image4: 'sample image4 url here',
    image5: 'sample image5 url here',
    tag : 'new or sale',
    info : {
      dimension : "10 X 10 X 10",
      finish : "sample finish",
      primary_material : "sample primary material",
      top_material : "smaple top material"
    },
    desc : 'sample description',
    insta : 'https://www.instagram.com/woods_leaf/'
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product created successfully', product });
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;