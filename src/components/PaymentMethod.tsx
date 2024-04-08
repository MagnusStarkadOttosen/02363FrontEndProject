import React, { useState } from "react";
import { useEffect } from "react";
import ConfirmOrderView from "./ConfirmOrderView";
import Total from "./Total";
const PaymentMethod: React.FC<{ totalAmount: number }> = ({ totalAmount }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    paymentMethod: "",
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

    let formattedValue = value;
    if (name === "creditcardNumber" || name === "giftCardNumber") {
      const onlyNums = value.replace(/\D/g, "");
      formattedValue = onlyNums.replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "expirationDate") {
      const onlyNums = value.replace(/\D/g, "");
      formattedValue = onlyNums
        .replace(/^(0[1-9]|1[0-2])?(\d{2})?/, (match, p1, p2) => {
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
      setIsSubmitted(true);
    } else {
      console.log("Form is not invalid, please check the fields");
    }
  };
  if (isSubmitted) {
    return <ConfirmOrderView />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="payment-method-form">
        <h2> Payment options</h2>
        <div className="form-wrapper">
          <div>
            <input
              type="radio"
              id="Giftcard"
              name="paymentMethod"
              value="Giftcard"
              checked={formState.paymentMethod === "Giftcard"}
              onChange={handleInputChange}
            />
            <label className="control-label" htmlFor="">
              Giftcard{" "}
            </label>
          </div>
          {formState.paymentMethod === "Giftcard" && (
            <div>
              <div className="row">
                <div>
                  <label className="label" htmlFor="c">
                    Giftcard number
                  </label>
                  <input
                    id="giftCardNumber"
                    className="form-control"
                    type="text"
                    name="giftCardNumber"
                    placeholder="**** **** **** ****"
                    value={formState.giftCardNumber}
                    onChange={handleInputChange}
                    pattern="\d{4} \d{4} \d{4} \d{4}"
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="label" htmlFor="c">
                    Pincode
                  </label>
                  <input
                    id="giftCardpincode"
                    className="form-control"
                    type="text"
                    name="giftCardpincode"
                    placeholder="****"
                    value={formState.giftCardpincode}
                    onChange={handleInputChange}
                    maxLength={4}
                  />
                </div>
                <div className="row">
                  <div>
                    <label className="label" htmlFor="giftCardAmount">
                      Amount
                    </label>
                    <input
                      id="giftCardAmount"
                      className="form-control"
                      type="text"
                      name="giftCardAmount"
                      value={formState.giftCardpincode}
                      onChange={handleInputChange}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
          <div>
            <div className="row">
              <div>
                <label className="label" htmlFor="creditcardNumber">
                  Card number
                </label>
                <input
                  id="creditcardNumber"
                  className="form-control"
                  type="text"
                  name="creditcardNumber"
                  placeholder="**** **** **** ****"
                  value={formState.creditcardNumber}
                  onChange={handleInputChange}
                  pattern="\d{4} \d{4} \d{4} \d{4}"
                  maxLength={19}
                />
              </div>
            </div>

            <div className="row">
              <div>
                <label className="label" htmlFor="expirationDate">
                  Expiry date
                </label>
                <input
                  id="expirationDate"
                  className="form-control"
                  type="text"
                  name="expirationDate"
                  placeholder="MM/YY"
                  value={formState.expirationDate}
                  pattern="\d{2} \d{2}"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="label" htmlFor="cvv">
                  CVC / CVV
                </label>
                <input
                  id="cvv"
                  className="form-control"
                  type="text"
                  name="cvv"
                  placeholder="***"
                  value={formState.cvv}
                  onChange={handleInputChange}
                  maxLength={3}
                />
              </div>
            </div>

            <div className="row">
              <div>
                <label className="label" htmlFor="cardsHolderName">
                  Name on card
                </label>
                <input
                  id="cardsHolderName"
                  className="form-control"
                  type="text"
                  name="cardsHolderName"
                  value={formState.cardsHolderName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="form-wrapper">
        <div>
          <input
            type="radio"
            id="Mobilepay"
            name="paymentMethod"
            value="Mobilepay"
            checked={formState.paymentMethod === "Mobilepay"}
            onChange={handleInputChange}
          />
          <label className="control-label" htmlFor="Mobilepay">
            {" "}
            Mobilepay
          </label>
        </div>
        {formState.paymentMethod === "Mobilepay" && (
          <div className="row">
            <div>
              <label className="label" htmlFor="c">
                Mobilepay number
              </label>
              <input
                id="mobilePayNumber"
                className="form-control"
                type="text"
                name="mobilePayNumber"
                value={formState.mobilePayNumber}
                onChange={handleInputChange}
                maxLength={8}
              />
            </div>
          </div>
        )}
      </div>

      {/* <Total totalAmount={totalAmount} /> */}
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentMethod;
