import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

class Hangout extends React.Component
{
  render()
  {
    return(
      <>
        <h2>Hangout</h2>
      </>
    )
  }
}
export default withAuth0(Hangout);
