import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormState, useFormDispatch } from "../context/FormContext";
import "../styles/BillingAndDelivery.css";
import { validatePhoneNumber, validateVAT, validateZip } from "../context/validation";

const BillingAndDelivery: React.FC = () => {

    const formState = useFormState();
    const dispatch = useFormDispatch();
    const navigate = useNavigate();

    const handleInputChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        console.log("Handling input change for:", event.target.name, "with value:", event.target.value);
        dispatch({
            type: 'SET_FIELD',
            payload: { field: event.target.name as keyof typeof formState, value: event.target.value }
        });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Handling checkbox change for:", event.target.name, "with checked state:", event.target.checked);
        dispatch({
            type: 'SET_FIELD',
            payload: { field: event.target.name as keyof typeof formState, value: event.target.checked }
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formState.isTermsAccepted) {
            alert("Please accept the terms and conditions.");
            return;
        }

        dispatch({ type: 'SET_LOADING', payload: true });

        try {
            const response = await fetch("https://eoqbb4g980b4bm3.m.pipedream.net", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (!response.ok) throw new Error("something went wrong.");

            alert("Form submitted successfully!");
        } catch (e) {
            console.error("submission error: ", e);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const handleNext = () => {
        navigate("/payment");
    };
    const handleBack = () => {
        navigate("/items")
    };

    useEffect(() => { //Validation for ZIP
        if (formState.orderZip.length === 4 && formState.orderCountry === "DK") {
            const checkZip = async () => {
                const result = await validateZip(formState.orderZip, formState.orderCountry);
                dispatch({
                    type: "SET_VALIDATION_RESULT",
                    payload: {
                        field: "orderZip",
                        valid: result.valid,
                        message: result.message,
                        city: result.city
                    }
                });
            };
            checkZip();
        }
    }, [formState.orderZip, formState.orderCountry, dispatch]);

    useEffect(() => { //Validation for billing address zip code
        if (formState.billingZip.length === 4 && formState.billingCountry === "DK") {
            const checkZip = async () => {
                const result = await validateZip(formState.billingZip, formState.billingCountry);
                dispatch({
                    type: "SET_VALIDATION_RESULT",
                    payload: {
                        field: "billingZip",
                        valid: result.valid,
                        message: result.message,
                        city: result.city
                    }
                });
            };
            checkZip();
        }
    }, [formState.billingZip, formState.billingCountry, dispatch]);

    useEffect(() => { //Validate the phone number
        if (formState.orderPhone.length >= 8 && formState.orderCountry === "DK") {
            const checkPhone = async () => {
                const result = await validatePhoneNumber(formState.orderPhone);
                dispatch({
                    type: "SET_VALIDATION_RESULT",
                    payload: {
                        field: "orderPhone",
                        valid: result.valid,
                        message: result.message,
                    }
                });
            };
            checkPhone();
        }
    }, [formState.orderPhone, formState.orderCountry, dispatch]);

    useEffect(() => {
        if (formState.orderVAT) {
            const result = validateVAT(formState.orderVAT);
            dispatch({
                type: "SET_VALIDATION_RESULT",
                payload: {
                    field: "orderVAT",
                    valid: result.valid,
                    message: result.message,
                }
            });
        }
    }, [formState.orderVAT, dispatch]);

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
                            <div className={`error-message ${formState.errors.orderPhone ? 'shown' : ''}`}>
                                {formState.errors.orderPhone || " "}
                            </div>
                        </div>
                        <div>
                            <label className="control-label" htmlFor="orderEmail">Email</label>
                            <input id="orderEmail" className='form-control' type='text' name='orderEmail' value={formState.orderEmail} onChange={handleInputChange}></input>
                            <div className={`error-message ${formState.errors.orderEmail ? 'shown' : ''}`}>
                                {formState.errors.orderEmail || " "}
                            </div>
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
                            <input
                                id="orderZip"
                                className='form-control'
                                type='text'
                                name='orderZip'
                                value={formState.orderZip}
                                onChange={handleInputChange}
                                maxLength={4}
                                min="0"
                                step="1"
                                onKeyPress={(event) => { /*If it works it works*/
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}></input>
                            <div className={`error-message ${formState.errors.orderZip ? 'shown' : ''}`}>
                                {formState.errors.orderZip || " "}
                            </div>
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
                            <div className={`error-message ${formState.errors.orderVAT ? 'shown' : ''}`}>
                                {formState.errors.orderVAT || " "}
                            </div>
                        </div>
                    </div>
                    <div className="checkbox">
                        <input type='checkbox' id="billingDifferent" name="isBillingDifferent" checked={formState.isBillingDifferent} onChange={handleCheckboxChange} />
                        <label className="checkbox-label" htmlFor="billingDifferent">Billing address is different from delivery address</label>
                    </div>
                    {formState.isBillingDifferent && (
                        <div className="billing-address-fields">
                            <div className='row'>
                                <div>
                                    <label className="control-label" htmlFor="billingAddress">Billing address</label>
                                    <input id="billingAddress" className='form-control' type='text' name='billingAddress' value={formState.billingAddress} onChange={handleInputChange}></input>
                                </div>
                                <div>
                                    <label className="control-label" htmlFor="billingCountry">Billing Country</label>
                                    <select id='billingCountry' className='form-control' name='billingCountry' value={formState.billingCountry} onChange={handleInputChange}>
                                        <option value="DK">
                                            Denmark
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div>
                                    <label className="control-label" htmlFor="billingZip">Billing Zip code</label>
                                    <input
                                        id="billingZip"
                                        className='form-control'
                                        type='text'
                                        name='billingZip'
                                        value={formState.billingZip}
                                        onChange={handleInputChange}
                                        maxLength={4}
                                        min="0"
                                        step="1"
                                        onKeyPress={(event) => { /*If it works it works*/
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}></input>
                                    <div className={`error-message ${formState.errors.billingZip ? 'shown' : ''}`}>
                                        {formState.errors.billingZip || " "}
                                    </div>
                                </div>
                                <div>
                                    <label className="control-label" htmlFor="billingCity">Billing City</label>
                                    <input id="billingCity" className='form-control' type='text' name='billingCity' value={formState.billingCity} onChange={handleInputChange}></input>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="checkbox">
                        <input type='checkbox' id="terms" name="isTermsAccepted" checked={formState.isTermsAccepted} onChange={handleCheckboxChange} />
                        <label className="checkbox-label" htmlFor="terms">I accept the terms and conditions</label>
                    </div>
                    <div className="checkbox">
                        <input type='checkbox' id="marketing" name="isMarketingAccepted" checked={formState.isMarketingAccepted} onChange={handleCheckboxChange} />
                        <label className="checkbox-label" htmlFor="marketing">I want to receive spam</label>
                    </div>
                    <div className='commentBox'>
                        <label className="control-label" htmlFor="orderComment">OrderComment (Optional)</label>
                        <textarea id="orderComment" className="form-control" name="orderComment" value={formState.orderComment} onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end", width: "100%", marginRight: "10px" }}>
                <button type="button" onClick={handleBack}>Back</button>
                <button type="button" onClick={handleNext}>Next</button>
                <button type="submit" disabled={formState.isLoading}>Submit Order</button>
                {formState.isLoading && <div className="loader"></div>}
            </div>
        </form>
    )
}

export default BillingAndDelivery;
