import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApi";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [isDelivering] = useState(false);

  return (
    <>
      {isLoading ? (
        <h2>
          <Loader />
        </h2>
      ) : isError ? (
        <Message variant="danger">{isError?.data?.message}</Message>
      ) : isDelivering ? (
        <>
          <p className="h3 lh-sm">
            <label>Hi Boy!! Your Product needs to Delivered</label>
          </p>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                <Product product={product} />
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
