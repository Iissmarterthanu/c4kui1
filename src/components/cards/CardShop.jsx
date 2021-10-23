import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';
import { red } from '@material-ui/core/colors';
import PriceTable from '../priceTable/PriceTable';
import Modal from '@material-ui/core/Modal';
import { Box } from '@material-ui/core';
import ShopImageList from './ShopImageList';
import { Stack } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "8em",
  },
  rootList: {
    // maxWidth: "95%",
  },
  avatar: {
    backgroundColor: red[500],
  },
  media: {
    height: "4.5em",
    // paddingTop: '56.25%', // 16:9
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  height: "98%", 
  maxWidth: "540px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CardShop({
  currGroup, currProduct, item, handleAddToCart
}) {
  // console.log("url", item);

  const classes = useStyles();
  const [pickSize, setPickSize] = React.useState('m');
  const [pickPrice, setPickPrice] = React.useState('');
  
  const handlePickSize = (event, newPickSize) => {
    setPickSize(newPickSize);
  };
  
  const sizeDesc = {
    s: "9 to 12 inches",
    m: "12.5 to 17 inches",
    l: "17 to 22 inches",
    xl: "22 to 27 inches",
  };

  useEffect(()=>{
    if (pickSize) {
      setPickPrice(currProduct.prices[pickSize]);
    } else {
      setPickPrice("select a size");
    };
    // console.log("card: ", pickPrice);
  },[pickSize, currProduct.prices])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };

  const body = (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h4" id="modal-title">{item.name}</Typography>
          <Typography variant="h6" id="modal-description">
            {item.desc}
          </Typography>
          <Box>
            <ShopImageList images={item.images} />
          </Box>
          <Stack spacing={2} direction="row">
            <Button size="medium" color="secondary" variant="contained"
              key={item.code}
              onClick={ (event) => {
                handleAddToCart(event, item, pickSize);
                // handleClose();  
              } } >
              Add to Cart
            </Button>
            <Button size="small" color="secondary" variant="outlined"
              onClick={ () => handleClose() } >
              Continue Shopping
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );

  
  
  return (
    <Card className={classes.root} align="left">
      {/* <CardActionArea> */}
        <CardMedia className={classes.media}
          component="img"
          alt={item.name}
          // height="240"
          // image={image3}
          image={item.images[0]}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {item.name}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {item.desc}
          </Typography>

          <PriceTable 
            currProduct={currProduct} 
            item={item}
            pickSize={pickSize}
            handlePickSize={handlePickSize} />

          <Typography variant="body1" align="center">fits {sizeDesc[pickSize]}</Typography>
          <Typography variant="h6">Price: Cdn$ {pickPrice}</Typography>

        </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="medium" color="secondary" variant="contained"
          key={item.code}
          onClick={ (event) => handleAddToCart(event, item, pickSize) } >
          Add to Cart
        </Button>
        <Button size="small" color="secondary" variant="outlined"
          key={item.code}
          onClick={ (event) => handleOpen(event, item, pickSize) } >
          Learn More
        </Button>
        {body}
      </CardActions>
    </Card>
  );
}
