import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApi";
import Message from "../components/Message";
import axios from "axios";
import { BASE_URL } from "../constants";
import Order from "../components/Order";

const useFetchProducts = (isDeliveringAgent) => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isDeliveringAgent) {
          setLoading(true);
          const allOrders = await axios.get(`${BASE_URL}api/delivery/order-delivery`);
          setOrders(allOrders.data.Orders);
          setLoading(false);
        }
      } catch (error) {
        setErr(error);
      }
    };

    fetchData();
  }, [isDeliveringAgent]);

  return {
    products: isDeliveringAgent ? orders : data,
    loading: isDeliveringAgent ? loading : isLoading,
    error: isDeliveringAgent ? err : isError,
  };
};

const HomeScreen = () => {
  let isDeliveringAgent = null;

  if (localStorage.getItem("userInfo")) {
    isDeliveringAgent = JSON.parse(localStorage.getItem("userInfo")).deliveryAgent;
  }

  const { products, loading, error } = useFetchProducts(isDeliveringAgent);

  return (
    <>
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
            <label>Hey Agent!! Your Product needs to be Delivered</label>
          </p>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                <Order product={product} />
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
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
