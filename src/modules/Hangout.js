import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import HangoutInput from "./HangoutInput";
import HangoutChat from "./HangoutChat";
import io from 'socket.io-client';


const URL = process.env.URL || 'http://localhost:3001/hangout';



class Hangout extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      currentLetter: '',
      chatMessage: ''
    }
  }

  joinSocket = async () =>
  {
    if (this.props.auth0.isAuthenticated)
    {
      try
      {
        // generate a token with auth0
        // we'll use it to make a secure request with to our server
        const res = await this.props.auth0.getIdTokenClaims();

        // this is the raw token
        // note the double underscore __ in .__raw
        const jwt = res.__raw;
        console.log('jwt token: ', jwt);

        const socket = io.connect(URL, {
          auth: {
            token: jwt
          }
        });
        socket.on('connect', () =>
        {
          console.log('socket id: ', socket.id);
          // put player stuff here
        });

        socket.on('connect_error', (err) =>
        {
          console.log('err instanceof Error: ', err instanceof Error); // true
          console.log('err.message: ', err.message); // not authorized
          console.log('err.data: ', err.data); // { content: "Please retry later" }
        });
        const payload = {
          playerId: socket.id,
          message: 'hey there',
          jwt: jwt,
        }

        socket.emit('hello', payload);
      }
      catch (error)
      {
        console.log('problem joining socket: ', error.response)
      }
    }
  }


  // this function changes state when user inputs a letter in the text box
  handleEnterLetter = e =>
  {
    e.preventDefault();
    console.log('entered letter: ', e.target.value);
    this.setState({
      currentLetter: e.target.value,
    });
  }

  // this function is where we'll do socket stuff
  handleSubmitLetter = e =>
  {
    e.preventDefault();
    // here, we'll use our socket model to create an event with the letter to use as a guess
  }

  // this function changes state when user inputs a letter in the text box
  handleEnterChat = e =>
  {
    e.preventDefault();
    console.log('entered message: ', e.target.value);
    this.setState({
      chatMessage: e.target.value,
    });
  }

  // this function is where we'll do socket stuff
  handleSubmitChat = e =>
  {
    e.preventDefault();
    // here, we'll use our socket model to create an event with the letter to use as a guess
  }

  componentDidMount()
  {
    this.joinSocket();
    /* we know this works!
    const socket = io.connect(URL);
    socket.on('connect', () =>
    {
      console.log('socket id: ', socket.id);
    });
    const payload = {
      playerId: socket.id,
      message: 'hey there'
    }

    socket.emit('hello', payload);
    */

  }

  render()
  {
    return (
      <>
        <HangoutInput
          handleEnterLetter={ this.handleEnterLetter }
          handleSubmitLetter={ this.handleSubmitLetter }
        />
        <HangoutChat
          handleEnterChat={ this.handleEnterChat }
          handleSubmitChat={ this.handleSubmitChat }
        />
      </>
    )
  }
}
export default withAuth0(Hangout);
