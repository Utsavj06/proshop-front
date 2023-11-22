import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL, // Replace with your API base URL
headers: {
  Authorization: `Bearer ${Cookies.get('jwt') || ''}`, // Include the Bearer token
},})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({})
})