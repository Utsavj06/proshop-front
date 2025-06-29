import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
{
  productQuery{
    name
    price
    image
    description
    rating
    numReviews
    _id
  }
}
`;

export const GET_SINGLE_PRODUCT = gql`
  query GetSingleProduct($id: ID!) {
    productById(id: $id) {
      name
      price
      image
      description
      rating
      numReviews
      countInStock
    }
  }
`;