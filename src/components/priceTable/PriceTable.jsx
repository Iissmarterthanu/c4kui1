import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

const useStyles = makeStyles({
  table: {
    width: "100%",
    fontSize: "0.9rem",
    fontFamily: 'Josefin Sans',
  },
});

function PriceTable({currProduct, item, pickSize, handlePickSize}) {
  const classes = useStyles();
  // console.log(item.name);
  // console.log(item.stock);
  const stocks = item.stock;
  // const stocks = Object.entries(item.stock);
  // const filteredStocks = stocks.filter(stock=>stock[1]!=="")
  // console.log(filteredStocks.sort());
  // console.log(currProduct.prices);
  // const sizeTab = {s:"small",m:"medium",l:"large",xl:"XL",};
  // const filteredPrices = filteredStocks.map(stock=>([...stock,sizeTab[stock[0]],currProduct.prices[stock[0]]]))
  // console.log(filteredPrices);
  
  return (
    <div>
      <Typography variant="h6">Sizes:</Typography>
        <Box 
        className={classes.table}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <ToggleButtonGroup style={{display: "block"}}
            value={pickSize}
            exclusive
            onChange={handlePickSize}
            aria-label="PickSize"
            >

            {stocks.s !== "" &&
              <ToggleButton value={"s"} key={"s"} style={{textTransform: 'none'}}>
                <Typography align="right" key={"S"}>S</Typography>
              </ToggleButton>
            }

            {stocks.m !== "" &&
              <ToggleButton value={"m"} key={"m"} style={{textTransform: 'none'}}>
                <Typography align="right" key={"M"}>M</Typography>
              </ToggleButton>
            }

            {stocks.l !== "" &&
              <ToggleButton value={"l"} key={"l"} style={{textTransform: 'none'}}>
                <Typography align="right" key={"L"}>L</Typography>
              </ToggleButton>
            }

            {stocks.xl !== "" &&
              <ToggleButton value={"xl"} key={"xl"} style={{textTransform: 'none'}}>
                <Typography align="right" key={"XL"}>{"XL"}</Typography>
              </ToggleButton>
            }



              {/* {filteredStocks.map((stock)=>(
                <ToggleButton value={stock[0]} key={stock[0]} 
                style={{textTransform: 'none'}}>
                  <Typography align="right" key={stock[0]}>{stock[0]}</Typography>
                </ToggleButton>
              ))} */}

          </ToggleButtonGroup>
        </Box>

      
    </div>
  );
}

export default PriceTable;

