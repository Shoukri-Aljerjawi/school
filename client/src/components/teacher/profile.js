import React from 'react';

export default function DashBord() {
  const currentUser = JSON.parse(localStorage.getItem('userLogin'));

  return (
    <>
      {currentUser.fullName ? (
        <section id="main-content">
          <section class="wrapper ">
            <div class="row">
              <div class="col-lg-12">
                <div class="profile col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div class="custom-box">
                    <div class="profileTitle">
                      <h4>Welcome</h4>
                      <h4>{currentUser.fullName} </h4>
                      <h5>({currentUser.roler})</h5>
                      <hr />
                    </div>
                    <div class="icn-main-container">
                      <span class="icn-container">
                        {currentUser.fullName.split(' ')[0][0]}
                      </span>
                    </div>
                    <p>
                      last Login in {currentUser.lastLogin.split('T')[0]} at{' '}
                      {currentUser.lastLogin.split('T')[1].split('.')[0]}
                    </p>
                    <ul class="data">
                      <li>Email : {currentUser.email}</li>
                      <li>Phone Number :{currentUser.phoneNumber}</li>
                      <li>Gender :{currentUser.gender}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
}
