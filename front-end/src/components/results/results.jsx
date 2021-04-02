import { useState, useEffect } from 'react';
import CUSTOMER from '../../constants/customer'
import CustomerCard from '../customerCard/customerCard';
import './results.less';

const Results = (props) => {
    const [results, setResults] = useState([]);
    const [queryCopy, setQueryCopy] = useState({
        ...CUSTOMER
    });

    const getRequestURL = (query) => {
        const queryString = Object.keys(query)
            .map(key => `${key}=${query[key]}`)
            .join("&");
        
        return `http://46.7.108.110:9000/customers?${queryString}`;
    }

    const deleteRequestBody = (customerId) => {
        let requestBody = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: customerId
            })
        };

        return requestBody;
    }

    const handleDeleteClick = (e, customerId) => {
        fetch('http://46.7.108.110:9000/customers', deleteRequestBody(customerId))
            .then(res => res.text())
            .then(res => { 
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

        e.stopPropagation(); // Stop parent's onClick from firing
    }

    useEffect(() => {
        if (JSON.stringify(props.query) === JSON.stringify(CUSTOMER)) {
            fetch('http://46.7.108.110:9000/customers')
                .then(res => res.json())
                .then(res => setResults(res))
                .catch(err => {
                    console.log(err);
                })
        } else {
            if(JSON.stringify(props.query) !== JSON.stringify(queryCopy)){
                setQueryCopy(props.query);
                fetch(getRequestURL(props.query))
                    .then(res => res.json())
                    .then(res => setResults(res))
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    });

    const renderCustomerCard = (customer) => {
        return (<CustomerCard key={customer._id} customer={customer} onClick={props.setCustomerToUpdate} handleDeleteClick={handleDeleteClick} />);
    }

    return (
        <div className="results">
            {results.map(customer => renderCustomerCard(customer))}
        </div>
    )
}

export default Results;