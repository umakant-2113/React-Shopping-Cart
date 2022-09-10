import React from 'react';

import data from './data.js';
class Product extends React.Component {
  constructor() {
    super();
  }

  render() {
   
    return (
      <>
        <div className='product-box'>
          {(this.props.value.length>0 ? this.props.value : data).map((elm) => {
            return (
              <div key={elm.productID}>
                <img className='img' src={elm.img} alt='' />
                <h2 className='h2'>{elm.name} </h2>
                <p> Brand : {elm.brand} </p>
                <p> Price : ${elm.price} </p>
                <button className='btn-primary' onClick={()=>this.props.add( {...elm, quantity : 1} ) } > Add Cart </button>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Product;
