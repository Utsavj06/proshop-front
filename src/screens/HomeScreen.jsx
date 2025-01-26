import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApi";
import { useGetDeliveryQuery } from "../slices/deliveryApiSlice";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import slide1 from '../assets/slick-1.png'
import slide2 from '../assets/slick-2.png'
import slide3 from '../assets/slick-3.png'
import slide4 from '../assets/slick-4.png'
import slide5 from '../assets/slick-5.png'
import slide6 from '../assets/slick-6.png'
import '../index.css'

const useFetchProducts = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  return { products: data, loading: isLoading, error: isError };
};

const useFetchOrders = () => {
  const { data, isLoading, isError } = useGetDeliveryQuery();

  return { products: data, loading: isLoading, error: isError };
};

const swiperImag = [slide1, slide2, slide3, slide4, slide5, slide6]

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

  const handleDotClick = (element) => {
    setImgIndex(element+1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if(imgIndex == swiperImag.length-1){
        setImgIndex(0)
        return
      }
      setImgIndex(prevIndex => prevIndex + 1); 
    }, 3000);

    return () => clearTimeout(timer);  
  }, [imgIndex]); 

  return (
    <>
    {!loading && <div className="carousel" onClick={handleCarouselNavigation}>
      <div className="carousel-dot">
      {swiperImag.map((_, index) => {
        return <span key={index} 
                    onClick={() => handleDotClick(index)}>
                    .
                    </span>
      })}
      </div>
      <img src={swiperImag[imgIndex]} alt="carousel" style={{width: '100%', height: '200px'}}/>
    </div>}
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
