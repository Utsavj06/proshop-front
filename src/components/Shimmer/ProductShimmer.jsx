import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ProductShimmer = () => {
  return (
    <h3>
      <Row>
        <Col md={3}>
          <div
            style={{
              height: "250px",
              backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
            }}
          />
        </Col>
        <Col md={4}>
          <div
            style={{
              height: "50px",
              marginBottom: "10px",
              width: "70%",
              backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
            }}
          />
          <hr />
          <div
            style={{
              height: "40px",
              marginBottom: "10px",
              width: "70%",
              backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
            }}
          />
          <hr />
          <div
            style={{
              height: "20px",
              marginBottom: "10px",
              width: "70%",
              backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
            }}
          />
          <hr />
          <div
            style={{
              height: "20px",
              marginBottom: "10px",
              width: "70%",
              backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
            }}
          />
        </Col>
        <Col md={3}>
          <Card>
            <div
              style={{
                height: "40px",
                margin: "5px",
                width: "70%",
                backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
              }}
            />
            <hr style={{ margin: "5px" }} />
            <div
              style={{
                height: "30px",
                margin: "5px",
                width: "70%",
                backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
              }}
            />
            <hr style={{ margin: "5px" }} />
            <div
              style={{
                height: "60px",
                margin: "5px",
                width: "70%",
                backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
              }}
            />
            <hr style={{ margin: "5px" }} />
            <div
              style={{
                height: "60px",
                margin: "5px",
                width: "70%",
                backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
              }}
            />
          </Card>
        </Col>
      </Row>
    </h3>
  );
};

export default ProductShimmer;
