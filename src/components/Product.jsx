import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product, isProduct }) => {
  if (!product) {
    return (
      <Card className="my-3 p-3 rounded">
        <Link>
          <div
            style={{
              height: "200px",
              width: "100%",
              backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
            }}
          />
        </Link>
        <Card.Body>
          <Link>
            <div
              style={{
                width: "100%",
                backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
                height: "2.5em",
                marginBottom: "10px",
              }}
            />
          </Link>

          <div
            style={{
              width: "100%",
              backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
              height: "20px",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              backgroundImage: "linear-gradient(to right, #cbc0c0, white)",
              height: "30px",
              marginTop: "10px",
            }}
          ></div>
        </Card.Body>
      </Card>
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
