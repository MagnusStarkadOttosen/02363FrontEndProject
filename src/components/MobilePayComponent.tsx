interface MobilePayPaymentProps {
  formState: {
    mobilePayNumber: string;
    paymentMethod: string;
  };
  
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const MobilePayPayment:React.FC<MobilePayPaymentProps> = ({
  formState,
  handleInputChange
}) => {
  return (
    <div>
      {/* {formState.paymentMethod === "Mobilepay" && ( */}
        
        <div className="row">
          <div>
            <label className="label" htmlFor="mobilePayNumber">
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
        
      {/* )} */}
    </div>
  );
};
export default MobilePayPayment;
