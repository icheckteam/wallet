import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import { getTxs } from '../actions/accounts'

function mapStateToProps(state) {
  return {
    txs: state.txs.txs,
    addr: state.auth.addr,
  };
}

class TransactionsContainer extends Component {
  render() {
    return (
      <div>
        <h1>Transactions</h1>
        <Transactions
          txs={this.props.txs}
          />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { getTxs }
)(TransactionsContainer);