import { Typography } from '@material-ui/core';
import React from 'react';

function Shop(props) {
  console.log("Shop props", props);
  
  // console.log("Shop", props);
  const { groups, products, items } = props;
  const { cartItems, setCartItems } = props;
  const { match } = props;
  const { params } = match;
  const { groupCode } = params;
  
  // 2 set pickProduct = null
  // 1 pickGroup = groupCode, xxx or undefined
  // 3 if pickGroup, get filteredProducts
  // 4 if filteredProducts.length === 1 set pickProduct     
  
  
  const handleClick = (event, name) => {
    console.log("click:", name);
    console.log("groupCode:", groupCode);
    // console.log("cartItems:", cartItems);
  }


  return (
    <div>
      <Typography variant="h4" align="center">Items</Typography>
      {items.map( (item) => (
        <Typography align="center" onClick={(event)=>handleClick(event, item.id)}
        key={item.id}>{item.id}</Typography>
      ))}
    </div>
  );
}

export default Shop;