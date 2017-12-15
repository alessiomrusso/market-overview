import React, { Component } from 'react';
import ExchangeRates from './exchangeRates';
import Orders from './orders';

const Summary = () => {
    return (
        <section className='section'>
            <Orders />
            <ExchangeRates />
        </section> 
    );
}

export default Summary;