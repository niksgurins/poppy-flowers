import React, { useRef } from 'react';
import './customerCard.less';

const CustomerCard = (props) => {
    const dialog = useRef();
    const icon = useRef();

    const toggleConfirmationDialog = (e) => {
        dialog.current.style.display === "none" || dialog.current.style.display === "" ? dialog.current.style.display = "flex" : dialog.current.style.display = "none";
        e.stopPropagation(); // Stop parent's onClick from firing
    }

    return (
        <div>
            <div className="customer-card" onClick={() => props.onClick(props.customer)}>
                <span className="icon-top-right" ref={icon} onClick={(e) => toggleConfirmationDialog(e)} onMouseEnter={() => icon.current.style.display = 'block'} onMouseLeave={() => icon.current.style.display = 'none'}> x </span>
                <div className="customer-details" onMouseEnter={() => icon.current.style.display = 'block'} onMouseLeave={() => icon.current.style.display = 'none'}>
                    <label>
                        Name
                        <p className="customer-data">{props.customer.name}</p>
                    </label>
                    <label>
                        Mobile
                        <p className="customer-data">{props.customer.mobile}</p>
                    </label>
                    <label>
                        Landline
                        <p className="customer-data">{props.customer.landline}</p>
                    </label>
                    <label>
                        Address
                        <p className="customer-data">{props.customer.address}</p>
                    </label>
                    <label>
                        Town
                        <p className="customer-data">{props.customer.town}</p>
                    </label>
                    <label>
                        Eircode
                        <p className="customer-data">{props.customer.eircode}</p>
                    </label>
                </div>
                <div className="confirmation-dialog" ref={dialog} id="dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="confirmation-dialog-details">
                        <p>Are you sure you want to delete this customer?</p>
                        <button type="button" onClick={(e) => props.handleDeleteClick(e, props.customer._id)}>Delete</button>
                        <button type="button" onClick={(e) => toggleConfirmationDialog(e)}>Cancel</button>
                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}

export default CustomerCard;