import React, { Component } from 'react'
import Header from './Header';
import LoginButton from './LoginButton'
import '../css/Splash.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default class Splash extends Component {
  render() {

    return (
     
      <div className='maincontainer'>
        <div class="container-fluid">
          <div class="row no-gutter">             
            <div class="col-md-6 d-none d-md-flex bg-image">
            </div>
            <div class="col-md-6 bg-light">
              <div class="login d-flex align-items-center py-5">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-10 col-xl-7 mx-auto">
                      <Header/>
                      <h3 class="display-4">Login Page!</h3>
                      <form>
                        <div class="d-grid gap-2 mt-2">
                          <LoginButton />
                        </div>
                          <div class="text-center d-flex justify-content-between mt-4"><p>Code by Hangout Team</p></div>
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
    
