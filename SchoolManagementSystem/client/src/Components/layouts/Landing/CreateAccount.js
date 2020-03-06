import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert, removeAlert } from "../../../actions/alert"; // alert actions
import { register } from "../../../actions/registration"; // register action
import { SET_ALERT, REMOVE_ALERT } from "../../../actions/types";
import PropTypes from "prop-types";
import Alert from "./Alert";

const CreateAccount = props => {
  const [formData, setFormData] = useState({
    schoolName: "",
    subdomain: "",
    adminName: "",
    adminPassword1: "",
    adminPassword2: "",
    address: "",
    contact: "",
    template: ""
  });

  const {
    schoolName,
    subdomain,
    adminName,
    adminPassword1,
    adminPassword2,
    address,
    contact,
    template
  } = formData;

  const onChange = e => {
    console.log(e.target.name);
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    // Dispatch register action
    props.register({
      schoolName,
      subdomain,
      adminName,
      adminPassword1,
      adminPassword2,
      address,
      contact,
      template: 1
    });
  };

  return (
    <div className='fluid-container' style={{ padding: "30px" }}>
      <div className='row'>
        <div className='col-sm-3'></div>
        <div className='col-sm-6 createAcct'>
          {" "}
          <form className='form' id='acctDetails' onSubmit={e => onSubmit(e)}>
            <div className='form-group' id='innerDetailsBox'>
              <div className='form-group input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-university fa-fw'></i>
                  </span>
                </div>

                <input
                  type='text'
                  className='input form-control'
                  placeholder='Enter School Name'
                  name='schoolName'
                  value={schoolName}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-link fa-fw'></i>
                  </span>
                </div>

                <input
                  type='text'
                  className='input form-control'
                  placeholder='Enter short school name for url'
                  name='subdomain'
                  value={subdomain}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-user fa-fw'></i>
                  </span>
                </div>

                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Admin Name'
                  name='adminName'
                  value={adminName}
                  onChange={e => onChange(e)}
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
                  placeholder='Enter Admin Password'
                  name='adminPassword1'
                  value={adminPassword1}
                  onChange={e => onChange(e)}
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
                  placeholder='Confirm Admin Password'
                  name='adminPassword2'
                  value={adminPassword2}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-map-marker fa-fw'></i>
                  </span>
                </div>

                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter School Address'
                  name='address'
                  value={address}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-phone fa-fw'></i>
                  </span>
                </div>

                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Contact Number'
                  name='contact'
                  value={contact}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
            </div>
          </form>
          <Alert />
        </div>

        <div className='col-sm-3'></div>
      </div>
      <div className='row' style={{ marginTop: "100px" }}>
        <div className='col-md-4'></div>
        <div className='col-md-4' style={{ textAlign: "center" }}>
          <button
            className='button button--primary'
            type='submit'
            form='acctDetails'
          >
            Create Account
          </button>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
};

CreateAccount.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  mapStateToProps: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});
export default connect(mapStateToProps, { setAlert, removeAlert, register })(
  CreateAccount
);
