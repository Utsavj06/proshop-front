import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row , Form} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApi";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {data: product, isLoading, isError} = useGetProductDetailsQuery(productId)
  const [qty, setQty] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))
    navigate('/cart')
  }

  return (
    <>
      <Link className="btn btn-light" to="/">
        Back
      </Link>
      {isLoading? (<h3><Loader /></h3>): 
      isError? (<Message variant='danger'>{isError?.data?.message || isError.error}</Message>) : (
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid height={200} width={150 />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock> 0 && 
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                  <Form.Control
                  as='select'
                  value={qty}
                  onChange={(e)=>setQty(Number(e.target.value))}>
                   {[...Array(product.countInStock).keys()].map((x)=>{
                   return  <option key={x+1} value={x+1}>
                      {x+1}
                    </option>
                   })}
                  </Form.Control>
                  </Col>
                </Row>
                </ListGroup.Item>}
              <ListGroup.Item>
                <Button
                    className="btn-black"
                    type='button'
                    disable5d={product.countInStock === 0} onClick={()=>addToCartHandler()}>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
    </>
  );
};

export default ProductScreen;
