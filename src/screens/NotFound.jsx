import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return <>
    <h3 className="d-flex justify-content-center">404 - Page Not found</h3>
    <Link to='/'><p className="text-decoration-underline d-flex justify-content-center">Go to Home</p></Link>
    </>;
};

export default NotFound;