import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import {StoreContext} from '../../context/StoreContext'
import {assets} from "../../assets/assets"
import axios from 'axios';

const MyOrder = () => {

    const {token, url} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrder = async () => {
        const response = await axios.post(url + "/api/order/userorders",
            {},
            {headers: {token}}
        )
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        if(token){
            fetchOrder();
        }
    }, [token]);

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, i) => {
                return (
                    <div key={i} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.items.map((item, j) => {
                                if(j === order.items.length - 1){
                                    return item.name + " x " + item.quantity;
                                }
                                else{
                                    return item.name + " x " + item.quantity + ", ";
                                }
                            })}
                        </p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrder
