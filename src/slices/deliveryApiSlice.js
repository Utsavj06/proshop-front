import { apiSlice } from './apiSlice';
import { USERS_URL, DELIVERY_URL } from '../constants';
import Cookies from 'js-cookie';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDelivery: builder.query({
      query: () => ({
        url: `${DELIVERY_URL}/order-delivery`,
      }),
      keepUnusedDataFor: 5,
    }),
    changeDeliveryStatus: builder.mutation({
      query: (orderId) => ({
        url: `${DELIVERY_URL}/change-status`,
        method: 'POST',
        body: orderId,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetDeliveryQuery,
  useChangeDeliveryStatusMutation,
} = userApiSlice;
