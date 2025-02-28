import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApi";
import { useGetDeliveryQuery } from "../slices/deliveryApiSlice";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import slide1 from '../assets/slide-1.png'
import slide2 from '../assets/slide-2.png'
import slide3 from '../assets/slide-3.jpg'
import slide4 from '../assets/slide-4.jpg'
import slide5 from '../assets/slide-5.jpg'
import Carousel from '../components/Carousel'
import '../index.css'

const useFetchProducts = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  return { products: data, loading: isLoading, error: isError };
};

const useFetchOrders = () => {
  const { data, isLoading, isError } = useGetDeliveryQuery();

  return { products: data, loading: isLoading, error: isError };
};

const swiperImag = [slide1, slide2, slide3, slide4, slide5]

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  let isDeliveringAgent = null;

  if (localStorage.getItem("userInfo")) {
    isDeliveringAgent = JSON.parse(localStorage.getItem("userInfo")).deliveryAgent;
  }

  const fetchProduct = useFetchProducts();
  const fetchOrders = useFetchOrders();

  const { products, loading, error } = isDeliveringAgent ? fetchOrders : fetchProduct;

  useEffect(()=>{
    window.scrollTo(0, 0); 
  },[])

  return (
    <>
    {/*!loading && <Carousel swiperImag={swiperImag} />*/}
      {loading ? (
        <h2>
          <Row>
            {new Array(4).fill(
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={undefined} />
              </Col>
            )}
          </Row>
        </h2>
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : isDeliveringAgent ? (
        <>
          <p className="h3 lh-sm">
            <label>{`Hey ${userInfo.name}!! Your Product needs to be Delivered`}</label>
          </p>
          <Row>
            {products.Orders.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                <Product product={product} isProduct={false} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h1 className="mt-3 mb-0">Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                <Product product={product} isProduct={true} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
