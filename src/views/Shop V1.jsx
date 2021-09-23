import React, { useEffect, useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Container, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import CardShop from '../components/cards/CardShop';

export default function Shop(props) {
  // console.log("Shop", props);
  const { groups, products, items } = props;
  const { cartItems, setCartItems } = props;
  const { match } = props;
  const { params } = match;
  const { groupCode } = params;

  
  
  let history = useHistory();
  
  const [pickGroup, setPickGroup] = React.useState(groupCode);
  const [pickProduct, setPickProduct] = React.useState('test');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currGroup, setCurrGroup] = useState({});
  const [currProduct, setCurrProduct] = useState({});
  
  useEffect( () => {
    console.log("shop cart items", cartItems);
  }, [cartItems] )



  const handlePickGroup = (event, newPickGroup) => {
    setPickGroup(newPickGroup);
  };
  
  const handlePickProduct = (event, newPickProduct) => {
    setPickProduct(newPickProduct);
  };
  
  useEffect( () => {
    // console.log(pickGroup);
    setFilteredProducts(products.filter((product)=>(
      product.gCode === pickGroup
    )));
    setCurrGroup(groups.find(group=>group.id === pickGroup));
    setPickProduct("test");
    const path = "/shop/" + pickGroup;
    // console.log(path);
    history.push(path);

  },[pickGroup, groups, products, history]) 
  
  useEffect( () => {
    // console.log("len", filteredProducts.length,filteredProducts[0].id)
    if (filteredProducts.length === 1) {
      setPickProduct(filteredProducts[0].id)
    }
    // console.log(filteredProducts);
  },[filteredProducts])

  useEffect( () => {
    // console.log(pickProduct);
    setFilteredItems(items.filter((item)=>(
      item.pCode === pickProduct
    )));
    setCurrProduct(products.find(product=>product.id === pickProduct));
  },[pickProduct, products, items]) 

  useEffect( () => {
    // console.log(filteredItems);
},[filteredItems])

  const handleAddToCart = (pickItem) => {
    console.log("Cart", pickItem.id, cartItems);

    // const exists = cartItems.find(item => item.id === pickItem.id);
    // if (exists) {
    //   setCartItems(cartItems.map(item => item.id === pickItem.id ? {...exists, qty: exists.qty + 1 } : item));
    // } else {
    //   setCartItems({...cartItems}, {...pickItem, qty: 1}); 
    // }
    // console.log(cartItems);
  };

  return (
    <div>
      {/* <Typography variant="body1">Group:</Typography> */}

      <ToggleButtonGroup style={{display: "block"}}
        value={pickGroup}
        exclusive
        onChange={handlePickGroup}
        aria-label="text PickGroup"
      >
          {groups.map((group)=>(
            <ToggleButton value={group.id} key={group.id} 
              style={{textTransform: 'none'}}>
              <Typography >{group.name}</Typography>
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
      
      {/* <Typography variant="body1">Sub Group:</Typography> */}
      
      <ToggleButtonGroup
        value={pickProduct}
        exclusive
        onChange={handlePickProduct}
        aria-label="text PickProduct"
      >
          {filteredProducts.map((product)=>(
            <ToggleButton value={product.id} key={product.id} 
              style={{textTransform: 'none'}}>
              <Typography variant="body1">{product.name}</Typography>
            </ToggleButton>
          ))}
      </ToggleButtonGroup>

      {currGroup && 
        <Typography variant="h4" align="center" style={{padding: "1em 0em 0.5em"}}>
          {currGroup.name}
        </Typography>}
      {currProduct && <Typography variant="h5" align="center">{currProduct.name}</Typography>}
      {currProduct && <Typography variant="h6" align="center" style={{padding: "0em 0em 2em"}}>{currProduct.desc}</Typography>}

      <Container style={{padding: "0em 2em"}} >
        <Grid container spacing={2} align="center">
          {filteredItems.map((item)=>(
            <Grid item key={item.id} xs={12} sm={12} md={6} lg={4}>
              <CardShop
                currGroup={currGroup}
                currProduct={currProduct}
                item={item}
                handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>

    </div>
  );
}
