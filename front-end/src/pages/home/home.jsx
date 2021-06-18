import React, { useState } from 'react';
import Form from '../../components/form/form';
import Results from '../../components/results/results';
import logo from '../../logo.jpg';
import CUSTOMER from '../../constants/customer';

const Home = () => {
    const [query, setQuery] = useState({
        ...CUSTOMER
    });

    const [customerToUpdate, setCustomerToUpdate] = useState({
        ...CUSTOMER
    });

    return (
        <>
            <img src={logo} alt="Poppy Flowers Logo" className="logo-img" />
            <div className="content">
                <Form query={query} setQuery={setQuery} customerToUpdate={customerToUpdate} setCustomerToUpdate={setCustomerToUpdate} />
                <Results query={query} setCustomerToUpdate={setCustomerToUpdate} />
            </div>
        </>
    )
}

export default Home;