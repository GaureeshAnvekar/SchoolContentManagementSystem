import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "./Landing/Alert";
import { studentAuth } from "../../actions/Student/studentAuth";
import { libraryAuth } from "../../actions/Library/libraryAuth";
import { employeeAuth } from "../../actions/Employee/employeeAuth";

const LoginSection = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    loginType: "",
  });

  const { username, password, loginType } = formData;

  const onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (loginType == "student") {
      //Dispatch student auth action
      props.studentAuth(props.schoolInfo.id, username, password, loginType);
      //console.log("login button " + props.studentIsAuthenticated);
    } else if (loginType == "library") {
      props.libraryAuth(props.schoolInfo.id, username, password, loginType);
    } else if (loginType == "staff") {
      props.employeeAuth(props.schoolInfo.id, username, password, loginType);
    }
  };
  return (
    <div
      className='row'
      style={{
        backgroundColor: "rgb(223, 224, 228)",
        width: "100%",
        margin: "0px",
      }}
    >
      <div
        className='col-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3'
        style={{ paddingTop: "100px" }}
      >
        <div
          className='container-fluid'
          id='detailsBox'
          style={{ padding: "30px" }}
        >
          <form id='authDetails' onSubmit={(e) => onSubmit(e)}>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='form-group' id='innerDetailsBox'>
                  <h2 style={{ textAlign: "center" }}>
                    WELCOME
                    <hr
                      style={{
                        height: "1px",
                        backgroundColor: "black",
                        color: "black",
                      }}
                    />
                  </h2>
                  <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <i className='fa fa-user fa-fw'></i>
                      </span>
                    </div>

                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter Username'
                      name='username'
                      value={username}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <i className='fa fa-key fa-fw'></i>
                      </span>
                    </div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Enter Password'
                      name='password'
                      value={password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row' id='loginPeople'>
              <div className='col-sm-3'>
                <div className='form-check form-check-inline'>
                  <input
                    type='radio'
                    className='form-check-input'
                    name='loginType'
                    value='student'
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <label
                    className='form-check-label'
                    style={{ marginTop: "1px" }}
                  >
                    Student
                  </label>
                </div>
              </div>
              <div className='col-sm-3'>
                <div className='form-check form-check-inline'>
                  <input
                    type='radio'
                    className='form-check-input'
                    name='loginType'
                    value='staff'
                    onChange={(e) => onChange(e)}
                  />
                  <label
                    className='form-check-label'
                    style={{ marginTop: "1px" }}
                  >
                    Staff
                  </label>
                </div>
              </div>
              <div className='col-sm-3'>
                <div className='form-check form-check-inline'>
                  <input
                    type='radio'
                    className='form-check-input'
                    name='loginType'
                    value='library'
                    onChange={(e) => onChange(e)}
                  />
                  <label className='form-check-label'>Library</label>
                </div>
              </div>
              <div className='col-sm-3'>
                <div className='form-check form-check-line'>
                  <input
                    type='radio'
                    className='form-check-input'
                    name='loginType'
                    value='admin'
                    onChange={(e) => onChange(e)}
                  />
                  <label className='form-check-label'>Admin</label>
                </div>
              </div>
            </div>
          </form>
          <div className='row' style={{ marginTop: "40px" }}>
            <div className='col-12' style={{ textAlign: "center" }}>
              <Alert />
              <button
                type='submit'
                id='btnLogin'
                className='btn btn-dark btn-lg'
                form='authDetails'
                style={{
                  backgroundColor: props.templateInfo.backgroundColor,
                  backgroundImage: props.templateInfo.backgroundImage,
                  borderStyle: "none",
                }}
              >
                <b>LOGIN</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginSection.propTypes = {
  studentAuth: PropTypes.func.isRequired,
  libraryAuth: PropTypes.func.isRequired,
  employeeAuth: PropTypes.func.isRequired,
};

export default connect(null, { studentAuth, libraryAuth, employeeAuth })(
  LoginSection
);
