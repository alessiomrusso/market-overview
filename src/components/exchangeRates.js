import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRatesSnapshot } from '../actions';

class ExchangeRates extends Component {

  componentDidMount() {
    this.props.getRatesSnapshot();
  }

  renderRates() {
    return _.map(this.props.supportedRates, (rate, index) => {
          return (
            <tr key={index}>
              <td>{rate.ccyPair.ccy1} </td>
              <td>{rate.ccyPair.ccy2} </td>
              <td>{rate.bid} </td>
              <td>{rate.ask} </td>
            </tr>
          );
    });
  }

  render() {
    return (
    <div className='card'>
        <div className='card-header'>
          <h3 className='title'> Rates </h3>
        </div>
        
          <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>Currency</th>
                    <th scope='col'>Counter Currency</th>
                    <th scope='col'>Bid</th>
                    <th scope='col'>Ask</th>
                </tr>
            </thead>
            <tbody>
                {this.renderRates()}
            </tbody>
          </table>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    supportedRates: state.supportedRates
  };
}

export default connect(mapStateToProps, { getRatesSnapshot })(ExchangeRates);
