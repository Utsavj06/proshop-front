import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApi";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, isError } = useGetProductDetailsQuery(productId);
  const [qty, setQty] = useState(1);
  const [isDelivering] = useState(false);
  const [markDel, setMarkDel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const deliverMark = () => {
    setMarkDel(!markDel);
  };

  return (
    <>
      <Link className="btn btn-light mb-3" to="/">
        Back
      </Link>
      {isLoading ? (
        <h3>
          <Row>
            <Col md={3}>
              <div style={{ height: "250px", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
            </Col>
            <Col md={4}>
              <div style={{ height: "50px", marginBottom: "10px", width: "70%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
              <hr />
              <div style={{ height: "40px", marginBottom: "10px", width: "70%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
              <hr />
              <div style={{ height: "20px", marginBottom: "10px", width: "70%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
              <hr />
              <div style={{ height: "20px", marginBottom: "10px", width: "70%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
            </Col>
            <Col md={3}>
              <Card>
                <div style={{ height: "40px", margin: "5px", width: "70%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
                <hr style={{ margin: "5px" }} />
                <div style={{ height: "30px", margin: "5px", width: "70%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
                <hr style={{ margin: "5px" }} />
                <div style={{ height: "60px", margin: "5px", width: "70%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
                <hr style={{ margin: "5px" }} />
                <div style={{ height: "60px", margin: "5px", width: "70%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
              </Card>
            </Col>
          </Row>
        </h3>
      ) : isError ? (
        <Message variant="danger">{isError?.data?.message || isError.error}</Message>
      ) : (
        <Row>
          <Col md={5} className="w-25 h-50">
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          {isDelivering ? (
            <>
              <Col md={4} className="mt-3">
                <Card.Body className=" rounded-3 p-2">
                  <h4>Delivering to: Admin</h4>
                  <address>Address to Deliver :</address>
                </Card.Body>
              </Col>
              <Col md={3} className="mt-3">
                <Card.Body className=" rounded-3 p-2">
                  <h1>is Delivered?</h1>
                  <Button onClick={() => deliverMark()}>Select Status</Button>
                  {markDel && (
                    <Card className="p-3 mt-3 w-50">
                      <h5 className="cursor-pointer mb-0">Yes</h5>
                      <hr className="mt-3 mb-2" />
                      <h5 className="cursor-pointer mb-0">No</h5>
                    </Card>
                  )}
                </Card.Body>
              </Col>
            </>
          ) : (
            <>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>₹{product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>{product.countInStock > 0 ? "In Stock" : "Out of"}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                              {[...Array(product.countInStock).keys()].map((x) => {
                                return (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                );
                              })}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button className="btn-black" type="button" disable5d={product.countInStock === 0} onClick={() => addToCartHandler()}>
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </>
          )}
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
