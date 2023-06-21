import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}
export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('sku', data.sku);
        setValue('name', data.name);
        setValue('slug', data.slug);
        setValue('collection_type', data.collection_type);
        setValue('category', data.category);
        setValue('price', data.price);
        setValue('actual_price', data.actual_price);
        setValue('image', data.image);
        setValue('image1', data.image1);
        setValue('image2', data.image2);
        setValue('image3', data.image3);
        setValue('image4', data.image4);
        setValue('image5', data.image5);
        setValue('tag', data.tag);
        setValue('dimension', data.info.dimension);
        setValue('finish', data.info.finish);
        setValue('primary_material', data.info.primary_material);
        setValue('top_material', data.info.top_material);
        setValue('desc', data.desc);
        setValue('insta' , data.insta)
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

    const [imageField , setimageField] = useState('');
    // upload image 
  const uploadHandler = async (e) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  // updating the product
  const submitHandler = async ({
    sku,
    name,
    slug,
    collection_type,
    category,
    price,
    actual_price,
    image,
    image1,
    image2,
    image3,
    image4,
    image5,
    tag,
    dimension,
    finish,
    primary_material,
    top_material,
    desc,
    insta,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/products/${productId}`, {
        sku,
        name,
        slug,
        collection_type,
        category,
        price,
        actual_price,
        image,
        image1,
        image2,
        image3,
        image4,
        image5,
        tag,
        dimension,
        finish,
        primary_material,
        top_material,
        desc,
        insta,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Product ${productId}`}>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul className='admin-ul'>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li style={{backgroundColor : '#6d8c75'}}>
              <Link href="/admin/products" className="font-bold">
                Products
              </Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
              style={{padding :  '0px 30px '}}
            >
              <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
              <div className="mb-4"> 
                <label htmlFor="sku">SKU *</label>
                <input
                  type="text"
                  className="w-full"
                  id="sku"
                  autoFocus
                  {...register('sku', {
                    required: 'Please enter sku of product',
                  })}
                />
                {errors.sku && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.sku.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.name.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="slug">slug (ex :- if Name is Bone Inaly Stool then slug is "bone_inaly_stool")</label>
                <input
                  type="text"
                  className="w-full"
                  id="slug"
                  autoFocus
                  {...register('slug', {
                    required: 'Please enter slug',
                  })}
                />
                {errors.slug && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.slug.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="collection_type">Collection *</label>
                <input
                  type="text"
                  className="w-full"
                  id="collection_type"
                  autoFocus
                  {...register('collection_type', {
                    required: 'Please enter collection type',
                  })}
                />
                {errors.collection_type && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.collection_type.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="category">Category *</label>
                <input
                  type="text"
                  className="w-full"
                  id="category"
                  autoFocus
                  {...register('category', {
                    required: 'Please enter category',
                  })}
                />
                {errors.category && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.category.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="w-full"
                  id="price"
                  {...register('price', {
                    required: 'Please enter price',
                  })}
                />
                {errors.price && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.price.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="actual_price">actual_price (optional)</label>
                <input
                  type="text"
                  className="w-full"
                  id="actual_price"
                  {...register('actual_price')}
                />
                {errors.actual_price && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.actual_price.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="image">image</label>
                <input
                  type="text"
                  className="w-full"
                  id="image"
                  {...register('image', {
                    required: 'Please enter image',
                  })}
                />
                {errors.image && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.image.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="imageFile">Upload image</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageFile"
                  onClick={()=>setimageField('image')}
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading....</div>}
              </div>
                
                {/* Image box start */}
              <div className="mb-4">
                <label htmlFor="image1">image1</label>
                <input
                  type="text"
                  className="w-full"
                  id="image1"
                  {...register('image1', {
                    required: 'Please enter image1',
                  })}
                />
                {errors.image1 && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.image1.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="imageField">Upload image1</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageField"
                  onClick={()=>setimageField('image1')}
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading....</div>}
              </div>
              {/* Image box end */}

                {/* Image box start */}
              <div className="mb-4">
                <label htmlFor="image2">image2</label>
                <input
                  type="text"
                  className="w-full"
                  id="image2"
                  {...register('image2', {
                    required: 'Please enter image2',
                  })}
                />
                {errors.image2 && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.image2.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="imageField">Upload image2</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageField"
                  onClick={()=>setimageField('image2')}
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading....</div>}
              </div>
              {/* Image box end */}

                {/* Image box start */}
              <div className="mb-4">
                <label htmlFor="image3">image3</label>
                <input
                  type="text"
                  className="w-full"
                  id="image3"
                  {...register('image3', {
                    required: 'Please enter image3',
                  })}
                />
                {errors.image3 && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.image3.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="imageField">Upload image3</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageField"
                  onClick={()=>setimageField('image3')}
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading....</div>}
              </div>
              {/* Image box end */}

                {/* Image box start */}
              <div className="mb-4">
                <label htmlFor="image4">image4</label>
                <input
                  type="text"
                  className="w-full"
                  id="image4"
                  {...register('image4', {
                    required: 'Please enter image4',
                  })}
                />
                {errors.image4 && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.image4.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="imageField">Upload image4</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageField"
                  onClick={()=>setimageField('image4')}
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading....</div>}
              </div>
              {/* Image box end */}

                {/* Image box start */}
              <div className="mb-4">
                <label htmlFor="image5">image5</label>
                <input
                  type="text"
                  className="w-full"
                  id="image5"
                  {...register('image5', {
                    required: 'Please enter image5',
                  })}
                />
                {errors.image5 && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.image5.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="imageField">Upload image5</label>
                <input
                  type="file"
                  className="w-full"
                  id="imageField"
                  onClick={()=>setimageField('image5')}
                  onChange={uploadHandler}
                />
                {loadingUpload && <div>Uploading....</div>}
              </div>
              {/* Image box end */}

              <div className="mb-4">
                <label htmlFor="tag">tag (optional)</label>
                <input
                  type="text"
                  className="w-full"
                  id="tag"
                  {...register('tag')}
                />
                {errors.tag && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.tag.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="dimension">dimension (ex : 10 X 10 X 10)</label>
                <input
                  type="text"
                  className="w-full"
                  id="dimension"
                  {...register('dimension')}
                />
                {errors.dimension && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>{errors.dimension.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="finish">finish (optional)</label>
                <input
                  type="text"
                  className="w-full"
                  id="finish"
                  {...register('finish')}
                />
                {errors.finish && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>
                    {errors.finish.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="primary_material">primary_material (optional)</label>
                <input
                  type="text"
                  className="w-full"
                  id="primary_material"
                  {...register('primary_material')}
                />
                {errors.primary_material && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>
                    {errors.primary_material.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="top_material">top_material (optional)</label>
                <input
                  type="text"
                  className="w-full"
                  id="top_material"
                  {...register('top_material')}
                />
                {errors.top_material && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>
                    {errors.top_material.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="desc">description</label>
                <input
                  type="text"
                  className="w-full"
                  id="desc"
                  {...register('desc', {
                    required: 'Please enter description',
                  })}
                />
                {errors.desc && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>
                    {errors.desc.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="insta">Instagram product url(optional)</label>
                <input
                  type="text"
                  className="w-full"
                  id="insta"
                  {...register('insta')}
                />
                {errors.insta && (
                  <div style={{color : 'red' , marginBottom:'15px' , fontSize:'11px'}}>
                    {errors.insta.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <button className="button-one floatleft text-uppercase" data-text={loadingUpdate ? 'Loading' : 'Update'} disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
              <div className="mb-4">
                <Link className="button-one floatleft text-uppercase" data-text="Back" href={`/admin/products`}>Back</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };