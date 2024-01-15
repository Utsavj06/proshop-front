import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCreateProductMutation } from "../slices/addProductSlice";
import { BASE_URL } from "../constants";

const AddProduct = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [Pic, setPic] = useState("");
  const [desc, setDesc] = useState("");
  const [brnd, setBrnd] = useState("");
  const [catry, setCatgry] = useState("");
  const [prce, setPrce] = useState('');
  const [stk, setStk] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const [ createProduct ] = useCreateProductMutation()

  const handleRegSub = async (e) => {
    e.preventDefault();

    const getAdminUser = JSON.parse(localStorage.getItem('userInfo'));
    const formData = new FormData();

    // Append data to the FormData object
    formData.append("image", Pic);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("brnd", brnd);
    formData.append("catry", catry);
    formData.append("prce", prce);
    formData.append("stk", stk);
    formData.append("rating", rating);
    formData.append("review", review);
    formData.append('userId', getAdminUser._id)

    try {
      // Send a POST request using axios
      const res = await axios.post(`${BASE_URL}/api/addProduct`,formData);

      alert(res.data)
      // Reset form values
      setPic("");
      setName("");
      setDesc("");
      setBrnd("");
      setCatgry("");
      setPrce("");
      setStk("");
      setRating("");
      setReview("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleForm = (e) => {
    const evTarg = e.target;
    const ipName = evTarg.id;
    switch (ipName) {
      case "photo":
        setPic(evTarg.files[0]);
        break;
      case "name":
        setName(evTarg.value);
        break;
      case "desc":
        setDesc(evTarg.value);
        break;
      case "ctgry":
        setCatgry(evTarg.value);
        break;
      case "brnd":
        setBrnd(evTarg.value);
        break;
      case "prce":
        setPrce(+evTarg.value);
        break;
      case "stk":
        setStk(evTarg.value);
        break;
      case "rtng":
        setRating(evTarg.value);
        break;
      case "rvw":
        setReview(evTarg.value);
        break;
      default:
        return;
    }
  };

  return (
    <div
      // className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "60vh", marginTop: '50px' }}
    >
      <Card>
        <Row className="d-flex justify-content-around">
          <Col
            lg={12}
            md={12}
            sm={12}
          >
            <Card>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Name of Product :
              </Col>
              <Col lg={6} sm={6} md={6} >
                <input type="text" id='name' value={name} onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Image of Product :
              </Col>
              <Col lg={6} sm={6} md={6}>
                <input type="file" id='photo' className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Description of Product :
              </Col>
              <Col lg={6} sm={6} md={6}>
                <input type="text" id='desc' value={desc} onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Brand of Product :
              </Col>
              <Col lg={6} sm={6} md={6}>
                <input type="text" id='brnd' value={brnd} onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Category of Product :
              </Col>
              <Col lg={6} sm={6} md={6}>
                <input type="text" id='ctgry' value={catry} onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Price of Product :
              </Col>
              <Col lg={6} sm={6} md={6}>
                <input type="text" id='prce' value={prce} onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Number of Product :
              </Col>
              <Col lg={6} sm={6} md={6}>
                <input type="text" id='stk' value={stk} onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Rating of Product :
              </Col>
              <Col lg={6} sm={6} md={6}>
                <input type="text" id='rtng' value={rating} onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            <Row className="p-3">
              <Col sm={4} md={4} lg={4}>
                Review of Product :
              </Col>
              <Col lg={6} sm={6} md={6}>
                <input type="text" id='rvw' value={review} onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
            </Card>
          </Col>
        </Row>
      </Card>
      <Button className="my-4" onClick={handleRegSub}>Submit</Button>
    </div>
  );
};

export default AddProduct;
