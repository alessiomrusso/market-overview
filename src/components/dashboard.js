import React, { Component } from 'react';
import NewOrder from './new_order';
import Summary from './summary';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Dashboard = () => {
  
    return (
        <div className='dashboard'>
            <header className='header'></header>
            <aside className='sidebar'>
                <div className='sidebar-header'></div>
                <nav className='menu'>
                    <ul className='sidebar-menu metismenu' id='sidebar-menu'>
                        <li className='active'>
                            <a> <i className='fa fa-th-large'></i>Overview</a>    
                        </li>
                    </ul>
                </nav>
            </aside>
            <BrowserRouter>
                <div className='routerContainer'>
                    <article className='content dashboard-page'>
                        <Switch>
                            <Route path='/order/new' component={NewOrder} />
                            <Route path='/' component={Summary} />
                        </Switch>
                    </article>
                </div>
            </BrowserRouter>
            <footer className='footer'>
                    <div className='footer-block author'>
                        <span className='author'>created by <strong>Alessio M. Russo</strong></span>
                    </div>
            </footer>
        </div>
    );
  
}

export default Dashboard;