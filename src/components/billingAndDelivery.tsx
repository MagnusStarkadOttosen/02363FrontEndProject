import React, { useState, useEffect } from 'react';
import '../styles/BillingAndDelivery.css';

const BillingAndDelivery: React.FC = () => {

    const [formState, setFormState] = useState({
        orderFirstName: '',
        orderLastName: '',
        orderPhone: '',
        orderEmail: '',
        orderAddress1: '',
        orderAddress2: '',
        orderZip: '',
        orderCity: '',
        orderCountry: 'DK', // Default to Denmark
        orderCompany: '',
        orderVAT: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    //Validation of Zip code only if country is denmark
    const [zipValid, setZipValid] = useState(true); //For zip validation
    const validateZip = async (zip: string, country: string) => {
        if (country === "DK") {
            try {
                const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setZipValid(true);
                    setFormState(prevState => ({ //This changes city. This is bad practice, you shouldn't change a controlled input like this.
                        ...prevState,
                        orderCity: data.navn,
                    }));
                } else {
                    setZipValid(false);
                }
            } catch (error) {
                console.error("Failed to validate ZIP code", error);
                setZipValid(false);
            }
        } else {
            setZipValid(true); //If not denmark assume zip is correct
        }
    };

    //Validation of emails. Should be able to catch most emails but perfect validation of email is almost imposible.
    const [emailValid, setEmailValid] = useState(true); //For email validation
    const validateEmail = (email: string) => {
        const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email); //Black magic regex
        setEmailValid(valid);
    };

    //TODO: it currently rejects all non-danish 8 digit numbers, it should not do this
    //Validates danish phone numbers are 8 digits
    const [phoneValid, setPhoneValid] = useState(true);
    const validatePhone = (phone: string, country: string) => {
        if(country === "DK" && phone.length === 8){
            setPhoneValid(true);
        }else{
            setPhoneValid(false);
        }
    };

    //TODO: it currently rejects all non-danish 8 digit VAT numbers, it should not do this
    //Validates danish VAT numbers are 8 digits
    const [vatValid, setVATValid] = useState(true);
    const validateVAT = (vat: string, country: string) => {
        if(country === "DK" && vat.length === 8){
            setVATValid(true);
        }else{
            setVATValid(false);
        }
    };

    //Revalidate then country changes
    useEffect(() => {
        validateZip(formState.orderZip, formState.orderCountry);
    }, [formState.orderCountry, formState.orderZip]);

    //Validate Email
    useEffect(() => {
        validateEmail(formState.orderEmail);
    }, [formState.orderEmail]);

    //Validate Phone
    useEffect(() => {
        validatePhone(formState.orderPhone, formState.orderCountry);
    }, [formState.orderCountry, formState.orderPhone]);

    //Validate VAT
    useEffect(() => {
        validateVAT(formState.orderVAT, formState.orderCountry);
    }, [formState.orderCountry, formState.orderVAT]);

    return (
        <div>
            <h2>Billing and Delivery</h2>
        
        <div className='form-wrapper'>
            <div className="row">
                <div>
                    <label className="control-label" htmlFor="orderFirstName">First Name</label>
                    <input id="orderFirstName" className='form-control' type='text' name='orderFirstName' value={formState.orderFirstName} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label className="control-label" htmlFor="orderLastName">Last Name</label>
                    <input id="orderLastName" className='form-control' type='text' name='orderLastName' value={formState.orderLastName} onChange={handleInputChange}></input>
                </div>
            </div>
            <div className="row">
                <div>
                    <label className="control-label" htmlFor="orderPhone">Phone</label>
                    <input id="orderPhone" className='form-control' type='text' name='orderPhone' value={formState.orderPhone} onChange={handleInputChange}></input>
                    {!phoneValid && <div className="invalid-feedback">Invalid phone for Denmark.</div>}
                </div>
                <div>
                    <label className="control-label" htmlFor="orderEmail">Email</label>
                    <input id="orderEmail" className='form-control' type='text' name='orderEmail' value={formState.orderEmail} onChange={handleInputChange}></input>
                    {!emailValid && <div className="invalid-feedback">Invalid email format.</div>}
                </div>
            </div>
            <div className='row'>
                <div>
                    <label className="control-label" htmlFor="orderAddress1">Address 1</label>
                    <input id="orderAddress1" className='form-control' type='text' name='orderAddress1' value={formState.orderAddress1} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label className="control-label" htmlFor="orderAddress2">Address 2</label>
                    <input id="orderAddress2" className='form-control' type='text' name='orderAddress2' value={formState.orderAddress2} onChange={handleInputChange}></input>
                </div>
            </div>
            <div className="row">
                <div>
                    <label className="control-label" htmlFor="orderZip">Zip code</label>
                    <input id="orderZip" className='form-control' type='text' name='orderZip' value={formState.orderZip} onChange={handleInputChange}></input>
                    {!zipValid && <div className="invalid-feedback">Invalid ZIP code for Denmark.</div>}
                </div>
                <div>
                    <label className="control-label" htmlFor="orderCity">City</label>
                    <input id="orderCity" className='form-control' type='text' name='orderCity' value={formState.orderCity} onChange={handleInputChange}></input>
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
            <div className="row">
                <div>
                    <label className="control-label" htmlFor="orderCompany">Company name</label>
                    <input id="orderCompany" className='form-control' type='text' name='orderCompany' value={formState.orderCompany} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label className="control-label" htmlFor="orderVAT">VAT</label>
                    <input id="orderVAT" className='form-control' type='text' name='orderVAT' value={formState.orderVAT} onChange={handleInputChange}></input>
                    {!vatValid && <div className="invalid-feedback">Invalid VAT for Denmark.</div>}
                </div>
            </div>
        </div>
        </div>
    )

}

export default BillingAndDelivery;