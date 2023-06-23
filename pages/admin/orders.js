import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
    const deliveryArray = ['Order Processing' , 'Order Dispatched' , 'In Transit' , 'Delivered'];
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="All Admin Orders">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul className='admin-ul'>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li style={{backgroundColor : '#6d8c75'}}>
              <Link href="/admin/orders" style={{fontWeight : '700'}}>
                Orders
              </Link>
            </li>
            <li>
              <Link href="/admin/products">Products</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="admin-overflow">
          <h1 style={{marginBottom : '1rem' , fontSize : '1.25rem' , lineHeight : '1.75rem'}}>Admin Orders</h1>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{color : 'red'}}>{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">USER</th>
                    <th className="p-5 text-left">DATE</th>
                    <th className="p-5 text-left">TOTAL</th>
                    <th className="p-5 text-left">PAID</th>
                    <th className="p-5 text-left">DELIVEREY STATUS</th>
                    <th className="p-5 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-5">{order._id}</td>
                      <td className="p-5">
                        {order.user ? order.user.name : 'DELETED USER'}
                      </td>
                      <td className="p-5">
                        {order.createdAt.substr(0, 10)}
                      </td>
                      <td className="p-5">${order.totalPrice}</td>
                      <td className="p-5">
                        {order.isPaid
                          ? `${order.paidAt.substr(0, 10)}`
                          : 'not paid'}
                      </td>
                      <td className="p-5">
                        {deliveryArray[order.deliveryStatus-1]}
                      </td>
                      <td className="p-5">
                        <Link className="button-one floatleft text-uppercase"  href={`/order/${order._id}`} passHref>
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
