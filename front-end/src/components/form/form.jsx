import React, { useState, useEffect } from 'react';
import CUSTOMER from '../../constants/customer'
import TOWNS from '../../constants/towns';
import './form.less'

const Form = (props) => {
    const [updatingCustomer, setUpdatingCustomer] = useState(false);
    const [response, setResponse] = useState();
    const [buttonText, setButtonText] = useState("Add Customer");
    const [formDetails, setFormDetails] = useState({
        ...CUSTOMER
    })

    const updateFormDetails = (e, formField) => {
        // copy formDetails entirely (...formDetails), then update formField in formDetails(state)
        setFormDetails({ ...formDetails, [formField]: e.currentTarget.value });
        if(!updatingCustomer)
            props.setQuery({ ...props.query, [formField]: e.currentTarget.value.trim() });
    }

    const getRequestBody = () => {
        let requestBody = {
            method: updatingCustomer ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formDetails
            })
        };

        return requestBody;
    }

    const handleSubmit = () => {
        if(JSON.stringify({...formDetails}) === JSON.stringify({...CUSTOMER})) {
            setResponse("Trying to insert a blank customer");
            errorResponse(true);
        } else if (formDetails.name === "") {
            setResponse("Please enter a customer name");
            errorResponse(true);
        } else {
            if(updatingCustomer) {
                fetch('http://46.7.108.110:9000/customers', getRequestBody())
                    .then(res => res.text())
                    .then(res => { 
                        setResponse(res);
                        errorResponse(false);
                        props.setCustomerToUpdate({...CUSTOMER});
                        setFormDetails({...CUSTOMER});
                        props.setQuery({...CUSTOMER});
                        setUpdatingCustomer(false);
                        setButtonText("Add Customer");
                    })
                    .catch(err => {
                        setResponse(err);
                        errorResponse(true);
                    });
            } else {
                fetch('http://46.7.108.110:9000/customers', getRequestBody())
                    .then(res => res.text())
                    .then(res => { 
                        setResponse(res);
                        errorResponse(false);
                        setFormDetails({...CUSTOMER});
                        props.setQuery({...CUSTOMER});
                    })
                    .catch(err => {
                        setResponse(err);
                        errorResponse(true);
                    });
            }
        }
    }

    useEffect(() => {
        if((props.customerToUpdate._id !== "" && !updatingCustomer) || formDetails._id !== props.customerToUpdate._id){
            setUpdatingCustomer(true);
            setFormDetails({...props.customerToUpdate});
            setButtonText("Update Customer");
        }
    });

    const errorResponse = (err) => {
        err ?
            document.getElementById("response").style.color = "#CD3333" :
            document.getElementById("response").style.color = "green"
    }

    const renderTownListOption = (key) => {
        return (
            <option key={key} value={TOWNS[key].value}>
                {TOWNS[key]}
            </option>
        )
    }

    return (
        <div className="form-div">
            <form className="form">
                <label>Name<span className="required-field"> * </span>
                    <input value={formDetails.name} onChange={(e) => updateFormDetails(e, "name")}></input>
                </label>
                <label>Town
                <input list="towns" value={formDetails.town} onChange={(e) => updateFormDetails(e, "town")}></input>
                    <datalist value={formDetails.town} id="towns" name="towns">
                        {Object.keys(TOWNS).map(key => renderTownListOption(key))}
                    </datalist>
                </label>
                <label>Eircode
                    <input value={formDetails.eircode} onChange={(e) => updateFormDetails(e, "eircode")}></input>
                </label>
                <label>Address
                    <input value={formDetails.address} onChange={(e) => updateFormDetails(e, "address")}></input>
                </label>
                <label>Mobile number
                    <input type="number" value={formDetails.mobile} onChange={(e) => updateFormDetails(e, "mobile")}></input>
                </label>
                <label>Landline
                    <input type="number" value={formDetails.landline} onChange={(e) => updateFormDetails(e, "landline")}></input>
                </label>
                <button type="button" className="add-btn" onClick={() => handleSubmit()}>{buttonText}</button>
            </form>
            <div className="response" id="response">{response}</div>
        </div>
    );
}

export default Form;