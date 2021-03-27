import './customerCard.less';

const CustomerCard = (props) => {
    return (
        <div >
            <div className="customer-card" onClick={() => props.onClick(props.customer)}>
                <span className="icon-top-right" onClick={() => props.handleDeleteClick(props.customer._id)}> x </span>
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
            <br />
        </div>
    )
}

export default CustomerCard;