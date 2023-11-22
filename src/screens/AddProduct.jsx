import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const AddProduct = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "90vh" }}>
      <Card>
        <Row className="d-flex justify-content-around">
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-around mt-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Name of Product :
              </Col>
              <Col lg={6}>
                <input type="text" className="w-100" />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Image of Product :
              </Col>
              <Col lg={6}>
                <input type="file" className="w-100" />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Description of Product :
              </Col>
              <Col lg={6}>
                <input type="text" className="w-100" />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Brand of Product :
              </Col>
              <Col lg={6}>
                <input type="text" className="w-100" />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Category of Product :
              </Col>
              <Col lg={6}>
                <input type="text" className="w-100" />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Price of Product :
              </Col>
              <Col lg={6}>
                <input type="text" className="w-100" />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Number of Product :
              </Col>
              <Col lg={6}>
                <input type="text" className="w-100" />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Rating of Product :
              </Col>
              <Col lg={6}>
                <input type="text" className="w-100" />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3 mb-3">
            <Row>
              {" "}
              <Col sm={4} md={4} lg={6}>
                Review of Product :
              </Col>
              <Col lg={6}>
                <input type="text" className="w-100" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Button className="mt-4">Submit</Button>
    </div>
  );
};

export default AddProduct;
