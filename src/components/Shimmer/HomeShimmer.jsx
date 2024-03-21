import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeShimmer = () => {
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
  )
}

export default HomeShimmer