import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
class Transactions extends Component {

  renderRow(tx, index) {
    let type, data;
    let msg = tx.tx.value.msg;
    switch(msg.type) {
      // sendCoin 
      case 'EAFDE32A2C87F8':
        type = "Send Token";
        data = (
          <div>
            {msg.value.outputs.map(output => {
              return (
                <div key={output.address}>
                  <p><em>To</em>: {output.address}</p>
                  <p><em>Amount</em>: 
                    {output.coins.map(coin => {
                      return (<span key={coin.denom}>{coin.amount} <em>{coin.denom}</em>, </span>)
                    })}
                  </p>
                </div>
              )
            })}
          </div>
        );
      break;
      // create asset
      case '8E4151824E2B80':
        type = "Create Asset";
        data = (
          <div>
            ID: {msg.value.asset_id},  Name: {msg.value.name}, Quantity: {msg.value.quantity}
          </div>
        );
      break;
      case '241AA14E79D880':
        type = "Add material";
        data = (
          <div>
            {msg.value.materials.map(material => {
              return (<span key={material.asset_id}> From: {material.asset_id} To: {msg.value.asset_id} </span>)
            })}
          </div>
        );
        break;
      case 'E9CB1A251E18F0':
        type = "Add Reporter";
        data = (
          <div>
            Reporter {msg.value.reporter} for asset {msg.value.asset_id}
          </div>
        );
        break;
      case '304553E545EF80':
      type = "Transfer asset";
      data = (
        <div>
          Transfer {msg.value.assets.join(",")} From: {msg.value.sender} To: {msg.value.recipient}
        </div>
      );
      break;
      case '06F6C30F9E7CF0':
      type = "Update properties";
      data = (
        <div>
          Asset ID : {msg.value.asset_id}
        </div>
      );
      break;
      case 'AD218BD2955E28':
      type = "Add quantity";
      data = (
        <div>
          Add  {msg.value.quantity}  Asset:  {msg.value.asset_id}
        </div>
      );
      break;  
      case '0B121308856DA8':
      type = "Sbutract quantity";
      data = (
        <div>
          Subtract  {msg.value.quantity} Asset: {msg.value.asset_id}
        </div>
      );
      break;  
      default:
      break;
    }

    return (
      <TableRow key={index}>
        <TableCell>{tx.hash}</TableCell>
        <TableCell>{tx.height}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell>{data}</TableCell>
        <TableCell>{tx.result.gasUsed} gas</TableCell>
        <TableCell>0 tomato</TableCell>
        <TableCell>{tx.time}</TableCell>
      </TableRow>
    )
  }

  render() {
    const { classes, txs} = this.props;
    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Gas</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {txs ? txs.map(this.renderRow): (
              <TableRow>
                <TableCell>No transactions</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(
  styles,
)(Transactions);