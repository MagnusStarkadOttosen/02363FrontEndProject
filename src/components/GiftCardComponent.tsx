import React from "react";

interface GiftCardPaymentProps {
  formState: {
    giftCardNumber: string;
    giftCardpincode: string;
    giftCardAmount: string;
    paymentMethod: string;
    secondaryPaymentMethod?: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGiftCardAmountChange: (value: string) => void;
  totalAmount: number;
}
const GiftCardPayment: React.FC<GiftCardPaymentProps> = ({
  formState,
  handleInputChange,
  handleGiftCardAmountChange,
  totalAmount,
}) => {
  
  return (
    <div>
      {formState.paymentMethod === "GiftCard" && (
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
                  value={formState.giftCardAmount}
                  onChange={(e) => handleGiftCardAmountChange(e.target.value)}
                />
                {totalAmount > parseFloat(formState.giftCardAmount) && (
                  <>
                    <label htmlFor="useCreditCard">Use Credit Card:</label>
                    <input
                      type="radio"
                      id="useCreditCard"
                      name="secondaryPaymentMethod"
                      value="CreditCard"
                      checked={
                        formState.secondaryPaymentMethod === "CreditCard"
                      }
                      onChange={handleInputChange}
                    />

                    <label htmlFor="useMobilePay">Use MobilePay:</label>
                    <input
                      type="radio"
                      id="useMobilePay"
                      name="secondaryPaymentMethod"
                      value="MobilePay"
                      checked={formState.secondaryPaymentMethod === "MobilePay"}
                      onChange={handleInputChange}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default GiftCardPayment;
