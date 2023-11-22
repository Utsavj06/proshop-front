import { apiSlice } from './apiSlice';
import { ADD_PRODUCT_URL } from '../constants';

export const addProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => ({
        url: ADD_PRODUCT_URL,
        method: 'POST',
        body: product,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
} = addProductApiSlice;