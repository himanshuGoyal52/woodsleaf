import { getToken } from 'next-auth/jwt';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user || !user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  if (req.method !== 'POST') {
    return res.status(400).send({ message: 'Method not allowed' });
  } 

  await db.connect();

  for(let i = 0 ; i<req.body.bulkProducts.length ; i++){

    const newProduct = new Product({
        ...req.body.bulkProducts[i],
        info : {
          dimension : req.body.bulkProducts[i].dimension,
          finish : req.body.bulkProducts[i].finish,
          primary_material : req.body.bulkProducts[i].primary_material,
          top_material : req.body.bulkProducts[i].top_material
        }
      });
    
      await newProduct.save();
  }

  await db.disconnect();
  res.send({ message: 'Products uploading successfully' });

};

export default handler;