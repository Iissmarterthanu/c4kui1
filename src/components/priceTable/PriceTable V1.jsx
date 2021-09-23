import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    width: "100%",
    fontSize: "0.9rem",
    fontFamily: 'Josefin Sans',
  },
});

function PriceTable({currProduct, item}) {
  const classes = useStyles();
  // console.log(item.name);
  // console.log(item.stock);
  const stocks = Object.entries(item.stock);
  const filteredStocks = stocks.filter(stock=>stock[1]!=="")
  // console.log(filteredStocks);
  // console.log(currProduct.prices);
  const sizeTab = {s:"small",m:"medium",l:"large",xl:"XL",};
  const filteredPrices = filteredStocks.map(stock=>([...stock,sizeTab[stock[0]],currProduct.prices[stock[0]]]))
  // console.log(filteredPrices);

  return (
    <div>
      <Typography variant="h6">Sizes & Price:</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead className={classes.table}>
            <TableRow className={classes.table}>
              {filteredPrices.map((price)=>(
                // console.log(size[0])
                <TableCell className={classes.table} align="right" key={price[0]}>{price[2]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="test">
              {filteredPrices.map((price)=>(
                // console.log(size[0])
                <TableCell className={classes.table} align="right" key={price[0]}>{price[3]}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
}

export default PriceTable;

