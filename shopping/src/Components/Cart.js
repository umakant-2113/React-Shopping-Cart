import React, { useState } from 'react';

const Cart = (props) => {
  let total = 0;
let data= props.data

  
  const[data1,setData]=useState(data)

  function cartDisplay() {
    let box = document.querySelector('.cart-box');
    box.style.display = 'block';
  }

  function hideCart() {
    let box = document.querySelector('.cart-box');
    box.style.display = 'none';
  }

  function itemDelete(index1) {
    setData(data1.filter((elm,i)=>i !==index1));
  }

  return ( 
    <>
      <div className='cart-div'>
        <img
          className='cart-img'
          onClick={() => cartDisplay()}
          src='/image/shopping.png'
          alt=''
        />
      </div>
      <select className='select' onChange={(event) => props.select(event)}>
        <option value='None'> None </option>
        <option value='Low To High'> Low To High</option>
        <option value='High To Low'> High To Low</option>
      </select>

      <div className='cart-box'>
        <div>
          <span onClick={hideCart} className='span'>
            ❌{' '}
          </span>
        </div>
        {props.data.map((elm, index) => {
          console.log(elm.productID)
          total += elm.price*elm.quantity 
          return (
            <div>
              <img className='cart-img2' src={elm.img} alt='' />
              <h2 className='name'>{elm.name} </h2>
              <p className='price' >price : ${elm.price}</p>
            <p className='quantity' >Quantity :  {elm.quantity}</p>
              <button onClick={() => itemDelete(index)}>Remove </button>
            </div>
          );
        })}
        <h2 className='total'> Total : {total} </h2>
      </div>
    </>
  );
};

export default Cart;
