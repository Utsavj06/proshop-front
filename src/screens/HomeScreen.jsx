import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApi";
import { useGetDeliveryQuery } from "../slices/deliveryApiSlice";
import Message from "../components/Message";

const useFetchProducts = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  return { products: data, loading: isLoading, error: isError };
};

const useFetchOrders = () => {
  const { data, isLoading, isError } = useGetDeliveryQuery();

  return { products: data, loading: isLoading, error: isError };
};

const HomeScreen = () => {
  let isDeliveringAgent = null;

  if (localStorage.getItem("userInfo")) {
    isDeliveringAgent = JSON.parse(localStorage.getItem("userInfo")).deliveryAgent;
  }

  const fetchProduct = useFetchProducts();
  const fetchOrders = useFetchOrders();

  const { products, loading, error } = isDeliveringAgent ? fetchOrders : fetchProduct;

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
