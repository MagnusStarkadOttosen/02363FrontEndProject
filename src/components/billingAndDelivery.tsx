import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormState, useFormDispatch } from "../context/FormContext";
import "../styles/BillingAndDelivery.css";
import { validateZip } from "../context/validation";

const BillingAndDelivery: React.FC = () => {

    const formState = useFormState();
    const dispatch = useFormDispatch();

    // const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    // const [isMarketingAccepted, setIsMarketingAccepted] = useState(true);
    // const [orderComment, setOrderComment] = useState("");
    // const [isBillingDifferent, setIsBillingDifferent] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    // const [submissionError, setSubmissionError] = useState('');

    // const [formState, setFormState] = useState({
    //     orderFirstName: '',
    //     orderLastName: '',
    //     orderPhone: '',
    //     orderEmail: '',
    //     orderAddress1: '',
    //     orderAddress2: '',
    //     orderZip: '',
    //     orderCity: '',
    //     orderCountry: 'DK', // Default to Denmark
    //     orderCompany: '',
    //     orderVAT: '',
    //     billingAddress: '',
    //     billingZip: '',
    //     billingCity: '',
    //     billingCountry: 'DK', // Default to Denmark
    // });

    const navigate = useNavigate();
    // const [isValid, setIsValid] = useState({
    //     orderFirstName: false,
    //     orderLastName: false,
    //     orderPhone: false,
    //     orderEmail: false,
    //     orderAddress1: false,
    //     orderZip: false,
    //     orderCity: false,
    //     orderCompany: true,
    //     orderVAT: true,
    // });
    const handleInputChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        // const { name, value } = event.target;
        // setFormState((prevState) => ({
        //     ...prevState,
        //     [name]: value,
        // }));
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
        // Simulate API call
        // dispatch({ type: 'SUBMIT_FORM_SUCCESS' }); // or dispatch an error action depending on the API response
        alert("Form submitted successfully!");
        // navigate('/some-path-on-success'); // Uncomment to navigate on success
    };

    // //Validation of Zip code only if country is denmark
    // const [zipValid, setZipValid] = useState(true); //For zip validation
    // const validateZip = async (zip: string, country: string) => {
    //     if (country === "DK") {
    //         try {
    //             const response = await fetch(
    //                 `https://api.dataforsyningen.dk/postnumre/${zip}`
    //             );
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log(data);
    //                 setZipValid(true);
    //                 setFormState((prevState) => ({ //This changes city. This is bad practice, you shouldn't change a controlled input like this.
    //                     ...prevState,
    //                     orderCity: data.navn,
    //                 }));
    //             } else {
    //                 setZipValid(false);
    //             }
    //         } catch (error) {
    //             console.error("Failed to validate ZIP code", error);
    //             setZipValid(false);
    //         }
    //     } else {
    //         setZipValid(true); //If not denmark assume zip is correct
    //     }
    // };

    // //Validation of Zip code only if country is denmark
    // const [zipBillingValid, setBillingZipValid] = useState(true); //For zip validation
    // const validateBillingZip = async (zip: string, country: string) => {
    //     if (country === "DK") {
    //         try {
    //             const response = await fetch(`https://api.dataforsyningen.dk/postnumre/${zip}`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log(data);
    //                 setBillingZipValid(true);
    //                 setFormState(prevState => ({ //This changes city. This is bad practice, you shouldn't change a controlled input like this.
    //                     ...prevState,
    //                     billingCity: data.navn,
    //                 }));
    //             } else {
    //                 setBillingZipValid(false);
    //             }
    //         } catch (error) {
    //             console.error("Failed to validate ZIP code", error);
    //             setBillingZipValid(false);
    //         }
    //     } else {
    //         setBillingZipValid(true); //If not denmark assume zip is correct
    //     }
    // };

    // //Validation of emails. Should be able to catch most emails but perfect validation of email is almost imposible.
    // const [emailValid, setEmailValid] = useState(true); //For email validation
    // const validateEmail = (email: string) => {
    //     const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email); //Black magic regex
    //     setEmailValid(valid);
    // };

    // //TODO: it currently rejects all non-danish 8 digit numbers, it should not do this
    // //Validates danish phone numbers are 8 digits
    // const [phoneValid, setPhoneValid] = useState(true);
    // const validatePhone = (phone: string, country: string) => {
    //     if (country === "DK" && phone.length === 8) {
    //         setPhoneValid(true);
    //     } else {
    //         setPhoneValid(false);
    //     }
    // };

    // //TODO: it currently rejects all non-danish 8 digit VAT numbers, it should not do this
    // //Validates danish VAT numbers are 8 digits
    // const [vatValid, setVATValid] = useState(true);
    // const validateVAT = (vat: string, country: string) => {
    //     if (country === "DK" && vat.length === 8) {
    //         setVATValid(true);
    //     } else {
    //         setVATValid(false);
    //     }
    // };

    // //Revalidate then country changes
    // useEffect(() => {
    //     validateZip(formState.orderZip, formState.orderCountry);
    // }, [formState.orderCountry, formState.orderZip]);

    // useEffect(() => {
    //     validateBillingZip(formState.billingZip, formState.billingCountry);
    // }, [formState.billingCountry, formState.billingZip]);

    // //Validate Email
    // useEffect(() => {
    //     validateEmail(formState.orderEmail);
    // }, [formState.orderEmail]);

    // //Validate Phone
    // useEffect(() => {
    //     validatePhone(formState.orderPhone, formState.orderCountry);
    // }, [formState.orderCountry, formState.orderPhone]);

    // //Validate VAT
    // useEffect(() => {
    //     validateVAT(formState.orderVAT, formState.orderCountry);
    // }, [formState.orderCountry, formState.orderVAT]);

    const handleNext = () => {
        // const allValid = Object.values(isValid).every((value) => value);
        // if (allValid) {
        navigate("/payment");
        // }   
    };
    const handleBack = () => {
        navigate("/items")
    };



    // const handleSubmit = async (event: { preventDefault: () => void; }) => {
    //     event.preventDefault();

    //     if (!isTermsAccepted) {
    //         alert("Please accept the terms and conditions.");
    //         return;
    //     }

    //     setIsLoading(true);
    //     setSubmissionError("");

    //     try {
    //         const response = await fetch("https://eoqbb4g980b4bm3.m.pipedream.net", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 ...formState,
    //                 isTermsAccepted,
    //                 isMarketingAccepted,
    //                 orderComment,
    //                 isBillingDifferent,
    //             }),
    //         });

    //         if (!response.ok) throw new Error("something went wrong.");

    //         alert("Form submitted successfully!");
    //     } catch (e) {
    //         console.error("submission error: ", e)
    //         setSubmissionError("An error occurred.")
    //     } finally {
    //         setIsLoading(false);
    //     }

    // }

    useEffect(() => {
        console.log("testing: ", formState.orderZip, "test: ", formState.orderCountry);
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
                            {/* {!phoneValid && <div className="invalid-feedback">Invalid phone for Denmark.</div>} */}
                        </div>
                        <div>
                            <label className="control-label" htmlFor="orderEmail">Email</label>
                            <input id="orderEmail" className='form-control' type='text' name='orderEmail' value={formState.orderEmail} onChange={handleInputChange}></input>
                            {/* {!emailValid && <div className="invalid-feedback">Invalid email format.</div>} */}
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
                            {formState.errors.orderZip && <div className="error-message">{formState.errors.orderZip}</div>}
                            {/* {!zipValid && <div className="invalid-feedback">Invalid ZIP code for Denmark.</div>} */}
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
                            {/* {!vatValid && <div className="invalid-feedback">Invalid VAT for Denmark.</div>} */}
                        </div>
                    </div>
                    <div className="checkbox">
                        <input type='checkbox' id="billingDifferent" checked={formState.isBillingDifferent} onChange={handleCheckboxChange} />
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
                                        min="0"
                                        step="1"
                                        onKeyPress={(event) => { /*If it works it works*/
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}></input>
                                    {/* {!zipBillingValid && <div className="invalid-feedback">Invalid ZIP code for Denmark.</div>} */}
                                </div>
                                <div>
                                    <label className="control-label" htmlFor="billingCity">Billing City</label>
                                    <input id="billingCity" className='form-control' type='text' name='billingCity' value={formState.billingCity} onChange={handleInputChange}></input>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="checkbox">
                        <input type='checkbox' id="terms" checked={formState.isTermsAccepted} onChange={handleCheckboxChange} />
                        <label className="checkbox-label" htmlFor="terms">I accept the terms and conditions</label>
                    </div>
                    <div className="checkbox">
                        <input type='checkbox' id="marketing" checked={formState.isMarketingAccepted} onChange={handleCheckboxChange} />
                        <label className="checkbox-label" htmlFor="marketing">I want to receive spam</label>
                    </div>
                    <div className='commentBox'>
                        <label className="control-label" htmlFor="orderComment">OrderComment (Optional)</label>
                        <textarea id="orderComment" className="form-control" name="orderComment" value={formState.orderComment} onChange={handleInputChange} />
                    </div>
                    {/* <div>
                        <button onClick={handleSubmit} type="button">Submit Order</button>
                        {isLoading && <div className="loader"></div>}
                        {submissionError && <div className="error-message">{submissionError}</div>}
                    </div> */}
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end", width: "100%", marginRight: "10px" }}>
                <button type="button" onClick={handleBack}>Back</button>
                <button type="button" onClick={handleNext}>Next</button>
                <button type="submit">Submit Order</button>
            </div>
        </form>
    )
}

export default BillingAndDelivery;