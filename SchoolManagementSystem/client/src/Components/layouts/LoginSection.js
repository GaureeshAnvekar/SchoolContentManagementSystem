import React from "react";

const LoginSection = () => {
  return (
    <div className='row'>
      <div
        className='col-12 col-sm-8 offset-sm-2 col-lg-6 offset-lg-3'
        style={{ paddingTop: "70px" }}
      >
        <div
          className='container-fluid'
          id='detailsBox'
          style={{ padding: "30px" }}
        >
          <div className='row'>
            <div className='col-sm-12'>
              <form>
                <div className='form-group' id='innerDetailsBox'>
                  <h2 style={{ textAlign: "center" }}>
                    WELCOME
                    <hr
                      style={{
                        height: "1px",
                        backgroundColor: "black",
                        color: "black"
                      }}
                    />
                  </h2>
                  <div class='form-group input-group'>
                    <div class='input-group-prepend'>
                      <span class='input-group-text'>
                        <i class='fa fa-user fa-fw'></i>
                      </span>
                    </div>

                    <input
                      type='text'
                      class='form-control'
                      placeholder='Enter Username'
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
                </div>
              </form>
            </div>
          </div>
          <div className='row' id='loginPeople'>
            <div className='col-sm-3'>
              <div className='form-check form-check-inline'>
                <input
                  type='radio'
                  className='form-check-input'
                  name='optradio'
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
                  name='optradio'
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
                  name='optradio'
                />
                <label className='form-check-label'>Library</label>
              </div>
            </div>
            <div className='col-sm-3'>
              <div className='form-check form-check-line'>
                <input
                  type='radio'
                  className='form-check-input'
                  name='optradio'
                />
                <label className='form-check-label'>Admin</label>
              </div>
            </div>
          </div>
          <div className='row' style={{ marginTop: "40px" }}>
            <div className='col-12' style={{ textAlign: "center" }}>
              <button
                type='button'
                id='btnLogin'
                className='btn btn-primary btn-lg'
                style={{
                  backgroundColor: "#3b5950",
                  backgroundImage: "linear-gradient(#4e69a2, #3b5998 50%)",
                  borderStyle: "none"
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

export default LoginSection;
