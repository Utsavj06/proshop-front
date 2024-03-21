import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import HomeShimmer from "./Shimmer/HomeShimmer";

const Product = ({ product, isProduct }) => {
  if (!product) {
    return (
      <HomeShimmer />
    );
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Link
        to={isProduct ? `/product/${product._id}` : `/order/${product._id}`}
      >
        <img
          src={!isProduct ? product.orderItems[0].image : product.image}
          style={{ height: "200px", width: "100%" }}
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Card.Text as="div">
          {isProduct ? (
            <>
              <Link to={`/product/${product._id}`}>
                <Card.Title as="div" className="product-title">
                  <strong>{product.name}</strong>
                </Card.Title>
              </Link>
            </>
          ) : (
            <>
              {product.orderItems.length > 1 ? (
                <span>{`+${product.orderItems.length - 1} products`}</span>
              ) : (
                <span>1 Product Only</span>
              )}
              <p>{`Is Delivered? : ${product.isDelivered}`}</p>
              <p>{`is Paid? : ${product.isPaid}`}</p>
            </>
          )}
        </Card.Text>
        <Card.Text as={!isProduct ? "p" : "div"}>
          {!isProduct ? (
            <b>{`Total Price: ₹ ${product.totalPrice}`}</b>
          ) : (
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          )}
        </Card.Text>
        {isProduct && <Card.Text as="h3">₹ {product.price}</Card.Text>}
      </Card.Body>
      {!isProduct && (
        <Link to={`/order/${product._id}`}>
          <Button style={{ width: "100%" }}>Proceed</Button>
        </Link>
      )}
    </Card>
  );
};

export default Product;
