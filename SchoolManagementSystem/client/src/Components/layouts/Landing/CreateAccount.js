import React from "react";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  return (
    <div className='fluid-container' style={{ padding: "30px" }}>
      <div className='row'>
        <div className='col-sm-3'></div>
        <div className='col-sm-6 createAcct'>
          {" "}
          <div className='form-group' id='innerDetailsBox'>
            <div class='form-group input-group'>
              <div class='input-group-prepend'>
                <span class='input-group-text'>
                  <i class='fa fa-university fa-fw'></i>
                </span>
              </div>

              <input
                type='text'
                class='form-control'
                placeholder='Enter School Name'
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
              />
            </div>
            <div class='form-group input-group'>
              <div class='input-group-prepend'>
                <span class='input-group-text'>
                  <i class='fa fa-user fa-fw'></i>
                </span>
              </div>

              <input
                type='text'
                class='form-control'
                placeholder='Enter Admin Name'
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
              />
            </div>
            <div class='form-group input-group'>
              <div class='input-group-prepend'>
                <span class='input-group-text'>
                  <i class='fa fa-map-marker fa-fw'></i>
                </span>
              </div>

              <input
                type='text'
                class='form-control'
                placeholder='Enter School Address'
              />
            </div>
            <div class='form-group input-group'>
              <div class='input-group-prepend'>
                <span class='input-group-text'>
                  <i class='fa fa-phone fa-fw'></i>
                </span>
              </div>

              <input
                type='text'
                class='form-control'
                placeholder='Enter Contact Number'
              />
            </div>
          </div>
        </div>
        <div className='col-sm-3'></div>
      </div>
      <div className='row' style={{ marginTop: "100px" }}>
        <div className='col-md-4'></div>
        <div className='col-md-4' style={{ textAlign: "center" }}>
          <Link className='button button--primary' to='!#'>
            Create Account
          </Link>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
};

export default CreateAccount;
