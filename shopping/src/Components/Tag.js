import React from 'react';
import data from './data.js';

class Tags extends React.Component {
  constructor() {
    super();
  }
  render() {
// console.log(this.props.activeTags)

    let arr = [];
    let value = data.forEach((elm) => {
      arr.push(elm.size.split(','));
    });

    let value2 = Array.from(new Set(arr.flat(Infinity)));

    return (
      <>
        <ul className='tag-list'  >
          {value2.map((elm) => {
            return <li key={elm}  onClick={()=>this.props.tags(elm)}  id ={this.props.activeTags.includes(elm)? "active" : " "} >{elm} </li>;
          })}
        </ul>
      </>
    );
  }
}

export default Tags;
