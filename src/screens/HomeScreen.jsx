import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApi";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const {data: products, isLoading, isError} = useGetProductsQuery();

  return (
    <>

    { isLoading ? (<h2><Loader /></h2>) : isError ? (
      <Message variant='danger'>{isError?.data?.message}</Message>
    ) : (
      <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
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
