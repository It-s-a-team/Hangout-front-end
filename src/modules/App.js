//import io from 'socket.io-client'
import React from 'react';
// import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Content from './Content';
// import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import Splash from './Splash';
// `withAuth0` is for `Class` components
import { withAuth0 } from '@auth0/auth0-react';

import Container from 'react-bootstrap/Container';


class App extends React.Component
{
  render()
  {
    return (
      <>
       

        <Container className="App">

          { // if authenticated, see the `LogoutButton`
            // if not authenticated, see the `LoginButton`
            this.props.auth0.isAuthenticated
              ? <LogoutButton />
              : <Splash />
          }

          { // if authenticated, see the Content.js and Main.js
            // if not authenticated, see a message asking them to log in
            this.props.auth0.isAuthenticated
              ?
              <>
                <Content />
                <Main />
              </>
              :
              <></>
          }
        </Container>

        <Footer />
      </>
    )
  }
}

// note that this is different than what we're used to
// this line allows us to use `auth0` as props
export default withAuth0(App);