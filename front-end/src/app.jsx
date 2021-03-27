import React, { useState } from 'react';
import Form from './components/form/form';
import Results from './components/results/results';
import './app.less';
import logo from './logo.jpg';
import CUSTOMER from './constants/customer'

const App = () => {
    const [query, setQuery] = useState({
        ...CUSTOMER
    });

    const [customerToUpdate, setCustomerToUpdate] = useState({
        ...CUSTOMER
    });

    return (
        <div className="app">
            <img src={logo} alt="Poppy Flowers Logo" className="logo-img" />
            <div className="content">
                <Form query={query} setQuery={setQuery} customerToUpdate={customerToUpdate} setCustomerToUpdate={setCustomerToUpdate} />
                <Results query={query} setCustomerToUpdate={setCustomerToUpdate} />
            </div>
        </div>
    )
}

export default App;