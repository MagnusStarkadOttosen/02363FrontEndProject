import React, { useState } from 'react';
import '../styles/BillingAndDelivery.css';

const BillingAndDelivery: React.FC = () => {

    const [formState, setFormState] = useState({
        orderFirstName: '',
        orderLastName: '',
        orderPhone: '',
        orderEmail: '',
        orderAddress: '',
        orderZip: '',
        orderCity: '',
        orderCountry: 'DK', // Default to Denmark
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return(
        <div className='form-wrapper'>
            <div className="row">
                <div>
                    <label className="control-label" htmlFor="orderFirstName">First Name</label>
                    <input id="orderFirstName" className='form-control'type='text' name='orderFirstName' value={formState.orderFirstName} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label className="control-label" htmlFor="orderLastName">Last Name</label>
                    <input id="orderLastName" className='form-control'type='text' name='orderLastName' value={formState.orderLastName} onChange={handleInputChange}></input>
                </div>
            </div>
            <div className="row">
                <div>
                    <label className="control-label" htmlFor="orderPhone">Phone</label>
                    <input id="orderPhone" className='form-control'type='text' name='orderPhone' value={formState.orderPhone} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label className="control-label" htmlFor="orderEmail">Email</label>
                    <input id="orderEmail" className='form-control'type='text' name='orderEmail' value={formState.orderEmail} onChange={handleInputChange}></input>
                </div>
            </div>
            <div className='row'>
                <div>
                    <label className="control-label" htmlFor="orderAddress">Address</label>
                    <input id="orderAddress" className='form-control'type='text' name='orderAddress' value={formState.orderAddress} onChange={handleInputChange}></input>
                </div>
            </div>
            <div className="row">
                <div>
                    <label className="control-label" htmlFor="orderZip">Zip code</label>
                    <input id="orderZip" className='form-control'type='text' name='orderZip' value={formState.orderZip} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label className="control-label" htmlFor="orderCity">City</label>
                    <input id="orderCity" className='form-control'type='text' name='orderCity' value={formState.orderCity} onChange={handleInputChange}></input>
                </div>
            </div>
            <div>
                <div>
                    <label className="control-label" htmlFor="orderCountry">Country</label>
                    <select id='orderCountry' className='form-control' name='orderCountry' value={formState.orderCountry} onChange={handleInputChange}>
                        <option value="DK">
                            Denmark
                        </option>
                        <option value="US">
                            USA
                        </option>
                    </select>
                </div>
            </div>
        </div>
    )

}

export default BillingAndDelivery;