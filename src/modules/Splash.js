import React, { Component } from 'react'
import Header from './Header';
import LoginButton from './LoginButton'
import '../css/Splash.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default class Splash extends Component
{
  render()
  {
    return (

      <div className='maincontainer'>
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image">
            </div>
            <div className="col-md-6 bg-light">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-7 mx-auto">
                      <Header />
                      <h3 className="display-4">Login Page!</h3>
                      <form>
                        <div className="d-grid gap-2 mt-2">
                          <LoginButton />
                        </div>
                        <div className="text-center d-flex justify-content-between mt-4"><p>Code by Hangout Team</p></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}
