import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import CreditCardPayment from "./CreditCardComponent";
import GiftCardPayment from "./GiftCardComponent";
import MobilePayPayment from "./MobilePayComponent";

const PaymentMethod: React.FC = () => {
  const [formState, setFormState] = useState({
    paymentMethod: "",
    secondaryPaymentMethod: "",
    mobilePayNumber: "",
    giftCardpincode: "",
    giftCardAmount: "",
    giftCardNumber: "",
    companyVAT: "",
    creditcardNumber: "",
    expirationDate: "",
    cvv: "",
    cardsHolderName: "",
  });
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "AppContext is null, make sure it is provided by a provider"
    );
  }

  const { totalAmount } = context;

  const [isValid, setIsValid] = useState({
    mobilePayNumber: true,
    giftCardpincode: true,
    giftCardNumber: true,
    giftCardAmount: true,
    companyVAT: true,
    creditcardNumber: true,
    expirationDate: true,
    cvv: true,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    let formattedValue = value;
    if (name === "creditcardNumber" || name === "giftCardNumber") {
      const onlyNums = value.replace(/\D/g, "");
      formattedValue = onlyNums.replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expirationDate") {
      const onlyNums = value.replace(/\D/g, "");
      formattedValue = onlyNums
        .replace(/^(0[1-9]|1[0-2])?(\d{2})?/, (_match, p1, p2) => {
          if (p2) {
            return `${p1}/${p2}`;
          } else {
            return p1 || "";
          }
        })
        .trim();
    } else if (
      name === "cvv" ||
      name === "giftCardpincode" ||
      name === "mobilePayNumber"
    ) {
      const onlyNums = value.replace(/\D/g, "");
      formattedValue = onlyNums.trim();
    } else if (name === "cardsHolderName") {
      const onlyLetters = value.replace(/[^a-zA-Z ]/g, "");
      formattedValue = onlyLetters.trim();
    }
    setFormState((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };
  const validateInput = (name: string, value: string) => {
    switch (name) {
      case "mobilePayNumber":
        setIsValid((prevState) => ({
          ...prevState,
          mobilePayNumber: /^\d{8}$/.test(value),
        }));
        break;
      case "giftCardAmount":
        setIsValid((prevState) => ({
          ...prevState,
          giftCardAmount: !isNaN(parseFloat(value)) && parseFloat(value) > 0,
        }));
        break;
      case "giftCardNumber":
        setIsValid((prevState) => ({
          ...prevState,
          giftCardNumber: /^\d+$/.test(value),
        }));
        break;
      case "companyVAT":
        setIsValid((prevState) => ({
          ...prevState,
          companyVAT: /^\d{8}$/.test(value),
        }));
        break;
      case "creditcardNumber":
        setIsValid((prevState) => ({
          ...prevState,
          creditcardNumber: /^\d{16}$/.test(value),
        }));
        break;
      case "expirationDate":
        setIsValid((prevState) => ({
          ...prevState,
          expirationDate: /^\d{2}\/\d{2}$/.test(value),
        }));
        break;
      case "cvv":
        setIsValid((prevState) => ({
          ...prevState,
          cvv: /^\d{3}$/.test(value),
        }));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (formState.paymentMethod === "MobilePay") {
      validateInput("mobilePayNumber", formState.mobilePayNumber);
    } else if (formState.paymentMethod === "GiftCard") {
      validateInput("giftCardpincode", formState.giftCardpincode);
      validateInput("giftCardNumber", formState.giftCardNumber);
    }
  }, [formState]);

  const handleGiftCardAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    setFormState((prevState) => ({
      ...prevState,
      giftCardAmount: amount.toFixed(2),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allValid = Object.values(isValid).every((value) => value);
    const paymentMethodValid = formState.paymentMethod !== "";

    let additionalChecksPassed = false;
    if (paymentMethodValid) {
      switch (formState.paymentMethod) {
        case "MobilePay":
          additionalChecksPassed = isValid.mobilePayNumber;
          break;
        case "GiftCard":
          additionalChecksPassed =
            isValid.giftCardNumber && isValid.giftCardpincode;
          break;
        case "CreditCard":
          additionalChecksPassed =
            isValid.creditcardNumber && isValid.expirationDate && isValid.cvv;
          break;
      }
    }
    if (allValid && paymentMethodValid && additionalChecksPassed) {
      console.log("Form is valid");
      context.setPaymentMethod(formState.paymentMethod);
      navigate("/confirm");
    } else {
      console.log("Form is not invalid, please check the fields");
    }
  };
  const handleBack = () => {
    navigate("/billing");
  };
  return (
    <form onSubmit={handleSubmit}>
     <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2> Payment options</h2>
        <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "100px",
            border: "2px gray double",
            borderRadius: "10px",
            height: "400px",
            width: "25%",
            justifyContent: "center",
          }}
        >
          <div className="form-wrapper">
            <input
              type="radio"
              id="GiftCard"
              name="paymentMethod"
              value="GiftCard"
              checked={formState.paymentMethod === "GiftCard"}
              onChange={handleInputChange}
            />
            <label className="control-label" htmlFor="GiftCard">
              Gift Card
            </label>
          </div>
          {formState.paymentMethod === "GiftCard" && (
            <GiftCardPayment
              formState={formState}
              handleInputChange={handleInputChange}
              handleGiftCardAmountChange={handleGiftCardAmountChange}
              totalAmount={totalAmount}
            />
          )}
          <div className="form-wrapper">
            <input
              type="radio"
              id="CreditCard"
              name="paymentMethod"
              value="CreditCard"
              checked={formState.paymentMethod === "CreditCard"}
              onChange={handleInputChange}
            />
            <label className="control-label" htmlFor="CreditCard">
              Credit Card
            </label>
          </div>
          {formState.paymentMethod === "CreditCard" && (
            <CreditCardPayment
              formState={formState}
              handleInputChange={handleInputChange}
            />
          )}

          <div className="form-wrapper">
            <input
              type="radio"
              id="MobilePay"
              name="paymentMethod"
              value="MobilePay"
              checked={formState.paymentMethod === "MobilePay"}
              onChange={handleInputChange}
            />
            <label className="control-label" htmlFor="MobilePay">
              MobilePay
            </label>
          </div>
          {formState.paymentMethod === "MobilePay" && (
            <MobilePayPayment
              formState={formState}
              handleInputChange={handleInputChange}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
              marginRight: "10px",
            }}
          >
            
          </div>
          </div>
        </div>
        <div style={{display:"flex", justifyContent:"end", width:"100%", marginRight:"10px"}}>
        <button type="button" onClick={handleBack}>
              Back
            </button>
            <button type="submit">Pay</button>
            </div>
          
      </div>
    </form>
  );
};

export default PaymentMethod;
