import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { createOrder } from '../actions';

class NewOrder extends Component {
        
  onSubmit(values) {
    this.props.createOrder(values, () => {
      this.props.history.push('/');
    });
  }

  renderCurrencySelector(name) {
      return (
        <Field
          label='Investment Currency'
          name = {name}
          component = 'select'
          className ='form-control'>     
                <option>Select a currency</option>    
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='SEK'>SEK</option>
                <option value='GBP'>GBP</option>
                <option value='NOK'>NOK</option>
                <option value='ZAR'>ZAR</option>
                <option value='CHF'>CHF</option>
                <option value='CHF'>CHF</option>
                <option value='JPY'>JPY</option>
        </Field>
      );
  }

  renderInputField(name) {
      return (
        <Field
            name={name}
            component='input'
            type='text'
            className='form-control'
        />
      );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
        <div className = 'row form-group'>
            <div className = 'col-sm-6'>
                <label>Investment Currency</label>
                {this.renderCurrencySelector('investmentCcy')}
            </div>
            <div className='col-sm-6'>
                <label>Investment Currency</label>
                {this.renderCurrencySelector('counterCcy')}
            </div>
        </div>

        <div className='row form-group'>
            <div className='col-sm-6'>
                <label>Limit</label>
                {this.renderInputField('limit')}
            </div>
            <div className='col-sm-6'>
                <label>Valid Until</label>
                {this.renderInputField('validUntil')}
            </div>
        </div>

        <div className='row form-group'>
            <div className='col-sm-6'>
                <label>Buy</label>
                <Field
                    name='buy'
                    component='input'
                    type='checkbox'
                    className='form-control'
                />
            </div>
        </div>
        <Button bsStyle='success' type='submit'>Create</Button>
        <Link to='/'>
            <Button bsStyle='danger' type='submit'>Cancel</Button>
        </Link>
      </form>
    );
  }
}

export default reduxForm({
  form: 'NewOrderForm'
})(connect(null, {createOrder})(NewOrder));
