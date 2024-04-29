interface CreditCardPaymentProps {
  formState: {
    creditcardNumber: string;
    expirationDate: string;
    cvv: string;
    cardsHolderName: string;
    paymentMethod: string;
    secondaryPaymentMethod?: string;
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const CreditCardPayment:React.FC<CreditCardPaymentProps> = ({
  formState,
  handleInputChange
}) => {
  return (
    <div>
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
  );
};
export default CreditCardPayment;
