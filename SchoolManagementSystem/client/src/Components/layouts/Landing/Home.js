import React from "react";
import template1Page1 from "../../../images/template1Page1.png";
import template1Page2 from "../../../images/template1Page2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className='fluid-container'
      style={{
        backgroundColor: "#fff",
        paddingTop: "60px",
        marginBottom: "70px"
      }}
    >
      <div className='row'>
        <div className='col-sm-12'>
          <h2
            id='appName'
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#ce973e"
            }}
          >
            Easy School
          </h2>
        </div>
      </div>
      <div className='row' style={{ marginTop: "20px", marginBottom: "100px" }}>
        <div class='col-sm-0 col-md-4'></div>
        <div className='col-sm-12 col-md-4'>
          <p
            style={{
              color: "rgba(74,74,74,0.7)",
              fontSize: "1.125rem",
              letterSpacing: "0.2px",
              textAlign: "center"
            }}
          >
            This application provides schools an easy way to setup their online
            management system. This user-friendly school management system is
            completely responsive with all the important features that every
            school needs.
          </p>
        </div>
        <div className='col-sm-0 col-md-4'></div>
      </div>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-3 steps'>
          <p
            style={{
              color: "rgba(74,74,74,0.7)",
              fontSize: "1.125rem",
              letterSpacing: "0.2px",
              textAlign: "center"
            }}
          >
            To setup a system for your school, just create an account by filling
            the essential school details like school name, address,
            administrator name etc.
          </p>
          <h4
            style={{
              lineHeight: "1.2",
              letterSpacing: "0.2px",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.125rem",
              color: "#4a4a4a",
              fontFamily:
                "Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif "
            }}
          >
            Step 1
          </h4>
        </div>
        <div className='col-md-3 steps'>
          <p
            style={{
              color: "rgba(74,74,74,0.7)",
              fontSize: "1.125rem",
              letterSpacing: "0.2px",
              textAlign: "center"
            }}
          >
            Select the best template from a variety of options, which best suits
            your school name and logo. Wide range of{" "}
            <a
              href='#templates'
              style={{ color: "black", textDecoration: "underline" }}
            >
              templates
            </a>{" "}
            are available.
          </p>
          <br />
          <h4
            style={{
              lineHeight: "1.2",
              letterSpacing: "0.2px",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.125rem",
              color: "#4a4a4a",
              fontFamily:
                "Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif "
            }}
          >
            Step 2
          </h4>
        </div>
        <div className='col-md-3 steps'>
          <p
            style={{
              color: "rgba(74,74,74,0.7)",
              fontSize: "1.125rem",
              letterSpacing: "0.2px",
              textAlign: "center"
            }}
          >
            Select the appropriate package according to your needs. A trial
            version of 6 months package is also available along with 1 year and
            5 year packages.
          </p>
          <br />
          <h4
            style={{
              lineHeight: "1.2",
              letterSpacing: "0.2px",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.125rem",
              color: "#4a4a4a",
              fontFamily:
                "Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif "
            }}
          >
            Step 3
          </h4>
        </div>
      </div>
      <div className='row' style={{ marginTop: "100px" }}>
        <div className='col-md-4'></div>
        <div className='col-md-4' style={{ textAlign: "center" }}>
          <Link className='button button--primary' to='/CreateAccount'>
            Get Started
          </Link>
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row' style={{ marginTop: "300px" }}>
        <div className='col-sm-3'></div>
        <div
          className='col-sm-6 d-flex justify-content-center steps'
          id='templates'
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <Carousel
            className='d-flex justify-content-center'
            indicators={false}
          >
            <Carousel.Item>
              <img
                className='d-block w-100'
                src={template1Page1}
                alt='First slide'
                style={{ margin: "0 auto" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src={template1Page2}
                alt='Third slide'
              />
            </Carousel.Item>
          </Carousel>

          <div className='col-sm-3'></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
