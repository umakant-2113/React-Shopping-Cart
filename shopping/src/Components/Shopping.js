import React from 'react';
import Header from './Header';
import Tags from './Tag';
import Product from './Product';
import Cart from './Cart';

import data from './data.js';

class Shopping extends React.Component {
  constructor() {
    super();
    this.state = {
      brand: '',
      price: 'None',
      filterData: [],
      activeTags: [],
      addCart: [],
    };
  }

  // filter by tags

  selectTags = (tag) => {
    this.setState((prevState) => {
      if (prevState.activeTags.includes(tag)) {
        let ind = this.state.activeTags.findIndex((t) => t === tag);
        this.state.activeTags.splice(ind, 1);
      } else {
        this.state.activeTags.push(tag);
      }

      let arr = [];
      let value2 = this.state.activeTags.map((elm) => {
        data.map((data) => {
          if (data.size.includes(elm)) {
            arr.push(data);
          }
        });
      });
      let newArr = Array.from(new Set(arr));

      return { activeTags: this.state.activeTags, filterData: newArr };
    });
  };

  // filter by price

  handleSelect = (event) => {
    let data2 = [...data];
    if (event.target.value === 'None') {
      data2 = [...data];
    } else if (event.target.value === 'Low To High') {
      data2 = data2.sort((a, b) => a.price - b.price);
    } else if (event.target.value === 'High To Low') {
      data2 = data2.sort((a, b) => b.price - a.price);
    }

    this.setState({
      price: event.target.value,
      filterData: data2,
    });
  };

  //   filter by input

  handlchange = ({ target }) => {
    let { name, value } = target;

    let data2 = data.filter((product) => {
      if (product.brand.toLowerCase().includes(value.toLowerCase())) {
        return product;
      }
    });
    this.setState({
      [name]: value,
      filterData: data2,
    });
  };

  remove = (e) => {
    let value = this.state.addCart;
    console.log(e, 'asdfghjkloiuy');
    console.log(value);
  };
  //   add to cart  productID

  handleClick = (data) => {
    let isExists = true;

    let arr = [...this.state.addCart];
    
    if (arr.length === 0) {
      arr.push(data);
      return this.setState({ ...this.state, addCart: arr });
    }

    isExists = arr.reduce((acc, cv) => {
      if (cv.productID === data.productID) {
        acc = true;
        return acc;
      }
      return acc;
    }, false);

    if (!isExists) {
      return this.setState({ ...this.state, addCart: [...arr, data] });
    }

    for (let item of arr) {
      if (item.productID === data.productID) {
        item['quantity'] = item.quantity + 1;
        break;
      }
    }

    return this.setState({ ...this.state, addCart: arr });
  };

  render() {
    console.log(this.state.addCart);
    return (
      <>
        <Header />

        <div className='box'>
          <div className='flex-15'>
            {' '}
            <Tags tags={this.selectTags} activeTags={this.state.activeTags} />
          </div>

          <div className='flex-60'>
            <div className='input-div'>
              <form onSubmit={this.handleSubmit}>
                <input
                  type='text'
                  id='brand'
                  name='brand'
                  value={this.state.inputValue}
                  onChange={(event) => this.handlchange(event)}
                  placeholder='Enter Brand name'
                />
              </form>
            </div>

            <Product value={this.state.filterData} add={this.handleClick} />
          </div>
          <div className='flex-15'>
            <Cart select={this.handleSelect} data={this.state.addCart} />
          </div>
        </div>
      </>
    );
  }
}

export default Shopping;
