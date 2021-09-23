import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import PriceTable from '../priceTable/PriceTable';
// import image3 from "../../assets/1b.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
  media: {
    height: "9em",
    // paddingTop: '56.25%', // 16:9
  },
});

export default function CardShop({
  currGroup, currProduct, item, handleAddToCart
  // , pickSize, handlePickSize
}) {
  // console.log("url", item);

  const classes = useStyles();
  const [pickSize, setPickSize] = React.useState('m');
  const [pickPrice, setPickPrice] = React.useState('');
  
  const handlePickSize = (event, newPickSize) => {
    setPickSize(newPickSize);
  };
  
  useEffect(()=>{
    if (pickSize) {
      setPickPrice(currProduct.prices[pickSize]);
    } else {
      setPickPrice("select a size");
    };

    console.log("card: ", pickPrice);

  },[pickSize, currProduct.prices])

  return (
    <Card className={classes.root} align="left">
      {/* <CardActionArea> */}
        <CardMedia className={classes.media}
          component="img"
          alt={item.name}
          height="140"
          // image={image3}
          image={item.images[0]}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {item.desc}
          </Typography>

          <PriceTable 
            currProduct={currProduct} 
            item={item}
            pickSize={pickSize}
            handlePickSize={handlePickSize} />

          <Typography variant="h6">Price: {pickPrice}</Typography>

        </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="medium" color="secondary" variant="contained"
          key={item.code}
          onClick={ (event) => handleAddToCart(event, item, pickSize) } >
          Add to Cart
        </Button>
        <Button size="small" color="secondary" variant="outlined">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
