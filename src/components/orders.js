import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders, cancelOrder } from '../actions';
import { Button } from 'react-bootstrap';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderOrders() {
    return _.map(this.props.orders, order => {
      return (
        <tr key={order.id}>
            <th scope='row'>{order.id}</th>
            <td>{order.investmentCcy}</td>
            <td>{order.buy.toString()}</td>
            <td>{order.counterCcy}</td>
            <td>{order.limit}</td>
            <td>{order.validUntil}</td>
            <td><Button bsStyle='danger' bsSize='small' onClick={this.onCancelClick.bind(this, order.id)}>Cancel</Button></td>
        </tr>
      );
    });
  }

  onCancelClick(id) {
    this.props.cancelOrder(id);
  }

  render() {
    return (
      <div className='card'>
      <div className='card-header'>
        <h3 className='title'> Orders </h3>
        <Link to={`/order/new`}>
          <Button bsStyle='primary' bsSize='small'>Create new</Button>
          </Link>
      </div>
      
        <table className='table'>
          <thead>
              <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>investment Currency</th>
                  <th scope='col'>Buy</th>
                  <th scope='col'>Counter Currency</th>
                  <th scope='col'>Limit</th>
                  <th scope='col'>Valid Until</th>
                  <th scope='col'></th>
              </tr>
          </thead>
          <tbody>
              {this.renderOrders()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { orders: state.orders };
}

export default connect(mapStateToProps, { fetchOrders, cancelOrder })(Orders);
