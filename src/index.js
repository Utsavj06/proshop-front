import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import AddProduct from "./screens/AddProduct";
import Profile from "./screens/Profile";
import PaymentScreens from "./screens/PaymentScreens";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import NotFound from "./screens/NotFound";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/addProduct" element={<AddProduct />} />
      <Route path="/forget-password" element={<ForgetPasswordScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/pay-card" element={<PaymentScreens />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const client = new ApolloClient({ uri: 'http://localhost:5000/graphql', cache: new InMemoryCache() });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>
);
