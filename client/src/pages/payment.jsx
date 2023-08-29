import { useState } from "react";
import { Link } from "react-router-dom";
import {MdClose} from "react-icons/md"

function Payment() {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow">
     <Link to={"/shop"}>(Back to Shop)</Link>
      <h2 className="text-lg font-semibold mb-4">Payment Form</h2>
      {paymentStatus === "success" ? (
        <>
          <div className="text-green-500 text-center">
            Payment successful! Thank you for your purchase. <br />
            <Link to={"/"}>(Back To Home)</Link>
          </div>
        </>
      ) : (
        <div>
        <form 
        className="dialog"
        onSubmit={handleSubmit}
        >
                      <div >
            <Link to={"/shop"} className="flex justify-center items-center w-10 h-10 bg-pink-200 rounded-2xl" ><MdClose /></Link>
            </div>
          <h1>Payment Form</h1>
        <p>Required Fileds are followed by *</p>
        <h2>Contact Information</h2>
        <p>Name: * <input type="text" name="name" required/></p>
        <fieldset>
            <legend>Gender * </legend>
            <p>
                Male <input type="radio" name="gender" id="male" required/> Female <input type="radio" name="gender" id="female" required/>
            </p>
        </fieldset>
        <p>Address: <textarea name="address" id="address" cols="100" rows="3"></textarea></p>
        <p>Email: * <input type="email" name="email" id="email" required/></p>
        <p>Pincode: * <input type="number" name="pincode" id="pincode" required/></p>
        <h2>Payment Information</h2>
        <p>Card Type: *
            <select name="card_type" id="card_type" required>
                <option value="">--Select a Card Type--</option>
                <option value="visa">Visa</option>
                <option value="rupay">Rupay</option>
                <option value="mastercard">MasterCard</option>
            </select>
        </p>
        <p>
            Card Number * <input type="number" name="card_number" id="card_number" required/>
        </p>
        <p>
            Expiration Date: * <input type="date" name="exp_date" id="exp_date" required/>
        </p>

        <p>CVV * <input type="password" name="cvv" id="cvv" required/></p>
        {paymentStatus === "processing" ? (
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
              disabled
            >
              Processing...
            </button>
          ) : (
            <div>
            <button
            type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Pay Now
            </button>

            </div>
          )}

        </form>

</div>
      )}
    </div>
  );
}

export default Payment;