import React, { useContext, useEffect, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({...data, [name]: value}));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if(cartItem[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(url + "/api/order/place", orderData, {headers: {token}});
    if(response.data.success){
      const {session_url} = response.data;
      alert(response.data.message);
      navigate("/");
      // window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order' action="">
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' value={data.firstName} onChange={onChangeHandle} type="text" placeholder='First Name' required/>
          <input name='lastName' value={data.lastName} onChange={onChangeHandle} type="text" placeholder='Last Name' required/>
        </div>
        <input name='email' value={data.email} onChange={onChangeHandle} type="email" placeholder='Email' required/>
        <input name='street' value={data.street} onChange={onChangeHandle} type="text" placeholder='Street' required/>
        <div className="multi-fields">
          <input name='city' value={data.city} onChange={onChangeHandle} type="text" placeholder='City' required/>
          <input name='state' value={data.state} onChange={onChangeHandle} type="text" placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input name='zipcode' value={data.zipcode} onChange={onChangeHandle} type="text" placeholder='Zip code' />
          <input name='country' value={data.country} onChange={onChangeHandle} type="text" placeholder='Country' required/>
        </div>
        <input name='phone' value={data.phone} onChange={onChangeHandle} type="text" placeholder='Phone' required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
