import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import * as xlsx from 'xlsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const [bulkProducts , setbulkProducts] = useState([]);
  
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            setbulkProducts(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
    
  }

  const [uploading , setUplaoding] = useState(false);

  const uploadBulkHandler = async () => {
    if(bulkProducts.length === 0){
      toast.error('please select file');
      return;
    }
    try {
      setUplaoding(true);
      await axios.post('/api/admin/products/bulkupload' , { bulkProducts});
      setUplaoding(false);
      toast.success('Products uploading done!');
      router.push('/shop');
    } catch (err) {
      setUplaoding(false);
      toast.error(getError(err));
    }
  }

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#6d8c75',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title="Admin Dashboard">
      <div >
        <div>
          <ul className='admin-ul'>
            <li style={{backgroundColor : '#6d8c75'}}>
              <Link href="/admin/dashboard" style={{fontWeight : '700'}}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="admin-md">
          <h1 style={{marginBottom : '1rem' , fontSize : '1.25rem' , lineHeight : '1.75rem'}}>Admin Dashboard</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{color : 'red'}}>{error}</div>
          ) : (
            <div>
              <div className="admin-small-grid">
                <div className="card m-5 p-5">
                  <p className="text-3xl">${summary.ordersPrice} </p>
                  <p>Sales</p>
                  <Link href="/admin/orders">View sales</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.ordersCount} </p>
                  <p>Orders</p>
                  <Link href="/admin/orders">View orders</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.productsCount} </p>
                  <p>Products</p>
                  <Link href="/admin/products">View products</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.usersCount} </p>
                  <p>Users</p>
                  <Link href="/admin/users">View users</Link>
                </div>
              </div>
              <h2 className="text-xl">Sales Report</h2>
              <div style={{margin : '30px'}}>
                <Bar
                  options={{
                    legend: { display: true, position: 'right' },
                  }}
                  data={data}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{display:'flex' , padding:'50px' , flexDirection :'column'  , alignItems:'center' , justifyContent:'center' }}>
        <h3>Bulk product upload</h3>
        <label>
          <input accept='.xlsx' onChange={readUploadFile} type='file'  />
        </label>

        <button onClick={uploadBulkHandler} disabled={uploading} data-text={uploading ? 'Uploading' : 'Upload'}className="mt-30 button-one floatleft text-uppercase">{uploading ? 'Uploading' : 'Upload'}</button>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;