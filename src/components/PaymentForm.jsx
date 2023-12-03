import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

import axios from "axios";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = ({ history }) => {
  // const alert = useAlert();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const paymentData = {
    // amount: Math.round(orderInfo.totalPrice * 100)
  };

  const submitHandler = async (e) => {
      e.preventDefault();
  //     try {

          const res = await axios.post('http://localhost:5000/api/process-payment', {amount:cart.itemsPrice*100})
          // console.log(res)

          const clientSecret = res.data.client_secret;

  //         console.log(clientSecret);

          if (!stripe || !elements) {
              return;
          }

          const result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                  card: elements.getElement(CardNumberElement),
                  billing_details: {
                      name: userInfo.name,
                      email: userInfo.email
                  }
              }
          });

          if (result.error) {
              alert(result.error.message);
              document.querySelector('#pay_btn').disabled = false;
          } else {

              // The payment is processed or not
              if (result.paymentIntent.status === 'succeeded') {

                const placeOrder = await createOrder({
                  orderItems: cart.cartItems,
                  shippingAddress: cart.shippingAddress,
                  paymentMethod: cart.paymentMethod,
                  itemsPrice: cart.itemsPrice,
                  shippingPrice: cart.shippingPrice,
                  taxPrice: cart.taxPrice,
                  totalPrice: cart.totalPrice,
                  isPaid : true,
                }).unwrap();
                dispatch(clearCartItems());
                navigate(`/order/${placeOrder._id}`);

  //                 order.paymentInfo = {
  //                     id: result.paymentIntent.id,
  //                     status: result.paymentIntent.status
  //                 }

  //                 // dispatch(createOrder(order))
              } else {
                  alert('There is some issue while payment processing')
              }
          }

  //     } catch (error) {
  //         document.querySelector('#pay_btn').disabled = false;
  //         alert.error(error.response.data.message)
  //     }
  }

  return (
    <Fragment>
      {/* <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment /> */}
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {/* {` - ${orderInfo && orderInfo.totalPrice}`} */}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
