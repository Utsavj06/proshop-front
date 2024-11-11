import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ProductShimmer = () => {
  return (
    <h3>
      <Row>
        <Col md={3}>
          <div
            className='shimmer-effect'
            style={{
              height: "250px",
            }}
          />
        </Col>
        <Col md={4}>
          <div
            className='shimmer-effect'
            style={{
              height: "50px",
              marginBottom: "10px",
            }}
          />
          <hr />
          <div
            className='shimmer-effect'
            style={{
              height: "40px",
              marginBottom: "10px",
            }}
          />
          <hr />
          <div
            className='shimmer-effect'
            style={{
              height: "20px",
              marginBottom: "10px",
            }}
          />
          <hr />
          <div
            className='shimmer-effect'
            style={{
              height: "20px",
              marginBottom: "10px",
            }}
          />
        </Col>
        <Col md={3}>
          <Card>
            <div
              className='shimmer-effect'
              style={{
                height: "40px",
                margin: "5px",
              }}
            />
            <hr style={{ margin: "5px" }} />
            <div
              className='shimmer-effect'
              style={{
                height: "30px",
                margin: "5px",
              }}
            />
            <hr style={{ margin: "5px" }} />
            <div
              className='shimmer-effect'
              style={{
                height: "60px",
                margin: "5px",
              }}
            />
            <hr style={{ margin: "5px" }} />
            <div
              className='shimmer-effect'
              style={{
                height: "60px",
                margin: "5px",
              }}
            />
          </Card>
        </Col>
      </Row>
    </h3>
  );
};

export default ProductShimmer;
