import React from 'react'
import "./Order.css"
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import {assets} from '../../assets/assets'

const Order = ({url}) => {

  const [orders, setOrders] = useState([]);

  const fetchOrder = async () => {
    const response = await axios.get(url + "/api/order/list");
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  const statusHandle = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId: orderId,
      status: e.target.value,
    });
    if(response.data.success){
      await fetchOrder();
    }
  }

  useEffect(() => {
    fetchOrder();
  }, [])

  return (
    <div className='order add'>
      <h3>Order</h3>
      <div className="order-list">
        {orders.map((order, i) => {
          return (
            <div key={i} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, j) => {
                    if(j === order.items.length - 1){
                      return item.name + " x " + item.quantity;
                    }
                    else{
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.zipcode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(e) => statusHandle(e, order._id)} value={order.status} name="" id="">
                <option value="Processing">Processing</option>
                <option value="Out of delivery">Out of delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Order
