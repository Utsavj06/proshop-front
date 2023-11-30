import React from 'react';
import PaymentForm from '../components/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripeApiKey } from '../constants';

const PaymentScreens = () => {
  return (
    // stripeApiKey &&
    <Elements stripe={loadStripe(stripeApiKey)}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentScreens;
