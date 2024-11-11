import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './shimmer.css'

const HomeShimmer = () => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link>
          <div
            className='shimmer-box'
            style={{
              height: "200px",
            }}
          >
            <div className='shimmer-effect' />
          </div>
        </Link>
        <Card.Body>
          <Link>
            <div
              className='shimmer-box'
              style={{
                height: "2.5em",
                marginBottom: "10px",
              }}
              >
              <div className='shimmer-effect' />
            </div>
          </Link>

          <div
            className='shimmer-box'
            style={{
              height: "20px",
            }}
          >
            <div className='shimmer-effect' />
          </div>
          <div
            className='shimmer-box'
            style={{
              height: "30px",
              marginTop: "10px",
            }}
          >
            <div className='shimmer-effect' />
          </div>
        </Card.Body>
      </Card>
  )
}

export default HomeShimmer