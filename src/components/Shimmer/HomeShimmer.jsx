import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './shimmer.css'

const HomeShimmer = () => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link>
          <div
            className='shimmer-effect'
            id='product-image'
          />
        </Link>
        <Card.Body>
          <Link>
            <div
              className='shimmer-effect'
              id='product-name'
             />
          </Link>

          <div
            className='shimmer-effect'
            id='product-rating'
          />
          <div
            className='shimmer-effect'
            id='product-price'
          />
        </Card.Body>
      </Card>
  )
}

export default HomeShimmer