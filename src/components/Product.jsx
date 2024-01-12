import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  if (!product) {
    return (
      <Card className="my-3 p-3 rounded">
        <Link>
          <div style={{ height: "200px", width: "100%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
        </Link>
        <Card.Body>
          <Link>
            <div style={{ width: "100%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)", height: "2.5em", marginBottom: "10px" }} />
          </Link>

          <div style={{ width: "100%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)", height: "20px" }}></div>
          <div style={{ width: "100%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)", height: "30px", marginTop: "10px" }}></div>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        {/* <Card.Img src={product.image} variant="top" /> */}
        <img src={product.image} style={{ height: "200px", width: "100%" }} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">₹ {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
