import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApi";
import { useGetDeliveryQuery } from "../slices/deliveryApiSlice";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import slideTop from '../assets/slide-top.jpg'
import slide1 from '../assets/slide-1.jpg'
import slide2 from '../assets/Slide-2.jpg'
import slide3 from '../assets/slide-3.jpg'
import slide4 from '../assets/slide-4.jpeg'
import '../index.css'

const useFetchProducts = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  return { products: data, loading: isLoading, error: isError };
};

const useFetchOrders = () => {
  const { data, isLoading, isError } = useGetDeliveryQuery();

  return { products: data, loading: isLoading, error: isError };
};

const swiperImag = [slideTop, slide1, slide2, slide3, slide4]

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [imgIndex, setImgIndex] = useState(0)
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

  const handleCarouselNavigation = (e) => {
    const pageWidth = window.innerWidth;

    if(e.clientX < pageWidth/2){
      if(imgIndex == 0){
        setImgIndex(swiperImag.length-1)
        return
      }
      setImgIndex(prev => prev-1)
    } else {
      if(imgIndex == swiperImag.length-1){
        setImgIndex(0)
        return
      }
      setImgIndex(prev => prev+1)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if(imgIndex == swiperImag.length-1){
        setImgIndex(0)
        return
      }
      setImgIndex(prevIndex => prevIndex + 1); 
    }, 2000);

    return () => clearTimeout(timer);  
  }, [imgIndex]); 

  return (
    <>
    <div className="carousel" onClick={handleCarouselNavigation}>
      <img src={swiperImag[imgIndex]} alt="Girl in a jacket" style={{width: '100%', height: '200px'}}/>
    </div>
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
          <h1>Latest Products</h1>
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
